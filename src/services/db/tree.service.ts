// import { buildTree, predict } from "~/globals/tree";

import { buildTree, predict } from "~/globals/tree";
import { prisma } from "~/prisma";

// // Dữ liệu ví dụ từ các bảng
// const inventoryTransactions = [
//   { ingredientName: 'Sữa', quantity: 21, date: new Date('2024-08-01') },
//   { ingredientName: 'Trà xanh', quantity: 26, date: new Date('2024-08-01') }
// ];

// const ingredientSummaries = [
//   { ingredientName: 'Sữa', actualAmount: 10 },
//   { ingredientName: 'Trà xanh', actualAmount: 100 }
// ];

// const ingredientInventories = [
//   { ingredientName: 'Sữa', quantity: 79 },
//   { ingredientName: 'Trà xanh', quantity: 74 }
// ];

// // Tạo dữ liệu cho cây quyết định
// const data = [
//   { soldAmount: 21, actualAmount: 10, inventory: 79, fraud: 'no' },
//   { soldAmount: 26, actualAmount: 100, inventory: 74, fraud: 'yes' }
// ];

// // Chọn cột tính năng và mục tiêu
// const features = ['soldAmount', 'actualAmount', 'inventory'];
// const target = 'fraud';

// // Chuyển đổi dữ liệu thành định dạng phù hợp
// const X = data.map(item => [item.soldAmount, item.actualAmount, item.inventory]);
// const y = data.map(item => item.fraud === 'yes' ? 1 : 0);

// // Xây dựng cây quyết định
// const tree = buildTree(X, y);

// // Dự đoán cho dữ liệu mới
// const newData = [
//   { ingredientName: 'Sữa', soldAmount: 21, actualAmount: 10, inventory: 79 },
//   { ingredientName: 'Trà xanh', soldAmount: 26, actualAmount: 100, inventory: 74 }
// ];

// export const predictions = newData.map(item => {
//   const prediction = predict(tree, [item.soldAmount, item.actualAmount, item.inventory]);
//   return {
//     ingredientName: item.ingredientName,
//     fraud: prediction === 1 ? 'yes' : 'no'
//   };
// });

interface IngredientItem {
  id: number;
  name: string;
}

interface DataItem {
  ingredientName: string;
  unit: string;
  soldAmount: number;
  actualAmount: number;
  inventory: number;
  fraud: 'yes' | 'no';
}

async function getData() {
  // Lấy dữ liệu từ IngredientInventory
  const ingredientInventories = await prisma.ingredientInventory.findMany();

  // Lấy dữ liệu từ InventoryTransaction
  const inventoryTransactions = await prisma.inventoryTransaction.findMany();

  // Lấy dữ liệu từ IngredientSummary
  const ingredientSummaries = await prisma.ingredientSummary.findMany();

  return { ingredientInventories, inventoryTransactions, ingredientSummaries };
}

async function getIngredientItems() {
  // Lấy dữ liệu từ IngredientItem
  return await prisma.ingredientItem.findMany();
}

async function prepareData() {
  const { ingredientInventories, inventoryTransactions, ingredientSummaries } = await getData();
  const ingredientItems = await getIngredientItems();

  // Tạo đối tượng để lưu trữ thông tin tồn kho
  const inventoryMap = new Map<number, number>();
  ingredientInventories.forEach(item => {
    inventoryMap.set(item.ingredientItemId, item.quantity);
  });

  // Tạo đối tượng để lưu trữ thông tin bán hàng
  const soldAmountMap = new Map<number, number>();
  inventoryTransactions.forEach(transaction => {
    if (transaction.stockType === 'STOCK_OUT') {
      const currentAmount = soldAmountMap.get(transaction.ingredientItemId!) || 0;
      soldAmountMap.set(transaction.ingredientItemId!, currentAmount + transaction.quantity);
    }
  });

  // Tạo đối tượng để lưu trữ thông tin thực tế
  const actualAmountMap = new Map<number, number>();
  ingredientSummaries.forEach(summary => {
    actualAmountMap.set(summary.ingredientItemId, summary.quantity);
  });

  // Tạo đối tượng để tra cứu tên nguyên liệu và đơn vị
  const ingredientMap = new Map<number, { name: string; unit: string }>();
  ingredientItems.forEach(item => {
    ingredientMap.set(item.id, { name: item.name, unit: item.unit });
  });

  // Kết hợp dữ liệu để tạo dữ liệu đầu vào cho cây quyết định
  const data: DataItem[] = [];
  for (const [ingredientId, inventory] of inventoryMap) {
    const soldAmount = soldAmountMap.get(ingredientId) || 0;
    const actualAmount = actualAmountMap.get(ingredientId) || 0;
    const { name: ingredientName, unit } = ingredientMap.get(ingredientId) || { name: 'Unknown', unit: 'Unknown' };
    const fraud = (soldAmount > actualAmount) ? 'no' : 'yes';
    data.push({
      ingredientName,
      soldAmount,
      actualAmount,
      inventory,
      unit,
      fraud
    });
  }

  return data;
}
export async function predictTree() {
  const data = await prepareData();

  // Chọn cột tính năng và mục tiêu
  const X = data.map(item => [item.soldAmount, item.actualAmount, item.inventory]);
  const y = data.map(item => item.fraud === 'yes' ? 1 : 0);

  // Xây dựng cây quyết định
  const tree = buildTree(X, y);

  // Dự đoán cho dữ liệu mới
  const predictions = data.map(item => {
    const prediction = predict(tree, [item.soldAmount, item.actualAmount, item.inventory]);
    return {
      ingredientName: item.ingredientName,
      soldAmount: item.soldAmount,
      actualAmount: item.actualAmount,
      inventory: item.inventory,
      unit: item.unit,
      fraud: prediction === 1 ? 'yes' : 'no'
    };
  });

  console.log(predictions);
}
