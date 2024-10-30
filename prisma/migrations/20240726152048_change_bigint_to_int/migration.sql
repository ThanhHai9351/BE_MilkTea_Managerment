/*
  Warnings:

  - The primary key for the `IngredientInventory` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `IngredientInventory` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - You are about to alter the column `inventoryId` on the `IngredientInventory` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - You are about to alter the column `ingredientItemId` on the `IngredientInventory` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - The primary key for the `IngredientItem` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `IngredientItem` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - The primary key for the `Inventory` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `Inventory` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - The primary key for the `InventoryTransaction` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `InventoryTransaction` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - You are about to alter the column `inventoryId` on the `InventoryTransaction` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - You are about to alter the column `staffId` on the `InventoryTransaction` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - The primary key for the `Order` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `Order` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - You are about to alter the column `userId` on the `Order` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - The primary key for the `OrderItem` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `OrderItem` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - You are about to alter the column `productId` on the `OrderItem` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - You are about to alter the column `quantity` on the `OrderItem` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - You are about to alter the column `orderId` on the `OrderItem` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - The primary key for the `Product` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `Product` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - The primary key for the `Recipe` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `Recipe` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - You are about to alter the column `productId` on the `Recipe` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - You are about to alter the column `ingredientItemId` on the `Recipe` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - The primary key for the `ShippingAddress` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `ShippingAddress` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - You are about to alter the column `userId` on the `ShippingAddress` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - The primary key for the `ShoppingCart` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `ShoppingCart` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - You are about to alter the column `userId` on the `ShoppingCart` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - The primary key for the `ShoppingCartItem` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `ShoppingCartItem` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - You are about to alter the column `shoppingCartId` on the `ShoppingCartItem` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - You are about to alter the column `productId` on the `ShoppingCartItem` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - The primary key for the `Supply` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `Supply` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - You are about to alter the column `staffId` on the `Supply` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - The primary key for the `SupplyItem` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `SupplyItem` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - You are about to alter the column `supplyId` on the `SupplyItem` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - You are about to alter the column `ingredientItemId` on the `SupplyItem` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `User` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.

*/
BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[IngredientInventory] DROP CONSTRAINT [IngredientInventory_ingredientItemId_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[IngredientInventory] DROP CONSTRAINT [IngredientInventory_inventoryId_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[InventoryTransaction] DROP CONSTRAINT [InventoryTransaction_inventoryId_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[InventoryTransaction] DROP CONSTRAINT [InventoryTransaction_staffId_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[Order] DROP CONSTRAINT [Order_userId_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[OrderItem] DROP CONSTRAINT [OrderItem_orderId_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[OrderItem] DROP CONSTRAINT [OrderItem_productId_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[Recipe] DROP CONSTRAINT [Recipe_ingredientItemId_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[Recipe] DROP CONSTRAINT [Recipe_productId_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[ShippingAddress] DROP CONSTRAINT [ShippingAddress_userId_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[ShoppingCart] DROP CONSTRAINT [ShoppingCart_userId_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[ShoppingCartItem] DROP CONSTRAINT [ShoppingCartItem_productId_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[ShoppingCartItem] DROP CONSTRAINT [ShoppingCartItem_shoppingCartId_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[Supply] DROP CONSTRAINT [Supply_staffId_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[SupplyItem] DROP CONSTRAINT [SupplyItem_ingredientItemId_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[SupplyItem] DROP CONSTRAINT [SupplyItem_supplyId_fkey];

-- AlterTable
ALTER TABLE [dbo].[IngredientInventory] DROP CONSTRAINT [IngredientInventory_pkey];
ALTER TABLE [dbo].[IngredientInventory] ALTER COLUMN [id] INT NOT NULL;
ALTER TABLE [dbo].[IngredientInventory] ALTER COLUMN [inventoryId] INT NOT NULL;
ALTER TABLE [dbo].[IngredientInventory] ALTER COLUMN [ingredientItemId] INT NOT NULL;
ALTER TABLE [dbo].[IngredientInventory] ADD CONSTRAINT IngredientInventory_pkey PRIMARY KEY CLUSTERED ([id]);

-- AlterTable
ALTER TABLE [dbo].[IngredientItem] DROP CONSTRAINT [IngredientItem_pkey];
ALTER TABLE [dbo].[IngredientItem] ALTER COLUMN [id] INT NOT NULL;
ALTER TABLE [dbo].[IngredientItem] ADD CONSTRAINT IngredientItem_pkey PRIMARY KEY CLUSTERED ([id]);

-- AlterTable
ALTER TABLE [dbo].[Inventory] DROP CONSTRAINT [Inventory_pkey];
ALTER TABLE [dbo].[Inventory] ALTER COLUMN [id] INT NOT NULL;
ALTER TABLE [dbo].[Inventory] ADD CONSTRAINT Inventory_pkey PRIMARY KEY CLUSTERED ([id]);

-- AlterTable
ALTER TABLE [dbo].[InventoryTransaction] DROP CONSTRAINT [InventoryTransaction_pkey];
ALTER TABLE [dbo].[InventoryTransaction] ALTER COLUMN [id] INT NOT NULL;
ALTER TABLE [dbo].[InventoryTransaction] ALTER COLUMN [inventoryId] INT NOT NULL;
ALTER TABLE [dbo].[InventoryTransaction] ALTER COLUMN [staffId] INT NOT NULL;
ALTER TABLE [dbo].[InventoryTransaction] ADD CONSTRAINT InventoryTransaction_pkey PRIMARY KEY CLUSTERED ([id]);

-- AlterTable
ALTER TABLE [dbo].[Order] DROP CONSTRAINT [Order_pkey];
ALTER TABLE [dbo].[Order] ALTER COLUMN [id] INT NOT NULL;
ALTER TABLE [dbo].[Order] ALTER COLUMN [userId] INT NOT NULL;
ALTER TABLE [dbo].[Order] ADD CONSTRAINT Order_pkey PRIMARY KEY CLUSTERED ([id]);

-- AlterTable
ALTER TABLE [dbo].[OrderItem] DROP CONSTRAINT [OrderItem_pkey];
ALTER TABLE [dbo].[OrderItem] ALTER COLUMN [id] INT NOT NULL;
ALTER TABLE [dbo].[OrderItem] ALTER COLUMN [productId] INT NOT NULL;
ALTER TABLE [dbo].[OrderItem] ALTER COLUMN [quantity] INT NOT NULL;
ALTER TABLE [dbo].[OrderItem] ALTER COLUMN [orderId] INT NOT NULL;
ALTER TABLE [dbo].[OrderItem] ADD CONSTRAINT OrderItem_pkey PRIMARY KEY CLUSTERED ([id]);

-- AlterTable
ALTER TABLE [dbo].[Product] DROP CONSTRAINT [Product_pkey];
ALTER TABLE [dbo].[Product] ALTER COLUMN [id] INT NOT NULL;
ALTER TABLE [dbo].[Product] ADD CONSTRAINT Product_pkey PRIMARY KEY CLUSTERED ([id]);

-- AlterTable
ALTER TABLE [dbo].[Recipe] DROP CONSTRAINT [Recipe_pkey];
ALTER TABLE [dbo].[Recipe] ALTER COLUMN [id] INT NOT NULL;
ALTER TABLE [dbo].[Recipe] ALTER COLUMN [productId] INT NOT NULL;
ALTER TABLE [dbo].[Recipe] ALTER COLUMN [ingredientItemId] INT NOT NULL;
ALTER TABLE [dbo].[Recipe] ADD CONSTRAINT Recipe_pkey PRIMARY KEY CLUSTERED ([id]);

-- AlterTable
ALTER TABLE [dbo].[ShippingAddress] DROP CONSTRAINT [ShippingAddress_pkey];
ALTER TABLE [dbo].[ShippingAddress] ALTER COLUMN [id] INT NOT NULL;
ALTER TABLE [dbo].[ShippingAddress] ALTER COLUMN [userId] INT NOT NULL;
ALTER TABLE [dbo].[ShippingAddress] ADD CONSTRAINT ShippingAddress_pkey PRIMARY KEY CLUSTERED ([id]);

-- AlterTable
ALTER TABLE [dbo].[ShoppingCart] DROP CONSTRAINT [ShoppingCart_pkey];
ALTER TABLE [dbo].[ShoppingCart] ALTER COLUMN [id] INT NOT NULL;
ALTER TABLE [dbo].[ShoppingCart] ALTER COLUMN [userId] INT NOT NULL;
ALTER TABLE [dbo].[ShoppingCart] ADD CONSTRAINT ShoppingCart_pkey PRIMARY KEY CLUSTERED ([id]);

-- AlterTable
ALTER TABLE [dbo].[ShoppingCartItem] DROP CONSTRAINT [ShoppingCartItem_pkey];
ALTER TABLE [dbo].[ShoppingCartItem] ALTER COLUMN [id] INT NOT NULL;
ALTER TABLE [dbo].[ShoppingCartItem] ALTER COLUMN [shoppingCartId] INT NOT NULL;
ALTER TABLE [dbo].[ShoppingCartItem] ALTER COLUMN [productId] INT NOT NULL;
ALTER TABLE [dbo].[ShoppingCartItem] ADD CONSTRAINT ShoppingCartItem_pkey PRIMARY KEY CLUSTERED ([id]);

-- AlterTable
ALTER TABLE [dbo].[Supply] DROP CONSTRAINT [Supply_pkey];
ALTER TABLE [dbo].[Supply] ALTER COLUMN [id] INT NOT NULL;
ALTER TABLE [dbo].[Supply] ALTER COLUMN [staffId] INT NOT NULL;
ALTER TABLE [dbo].[Supply] ADD CONSTRAINT Supply_pkey PRIMARY KEY CLUSTERED ([id]);

-- AlterTable
ALTER TABLE [dbo].[SupplyItem] DROP CONSTRAINT [SupplyItem_pkey];
ALTER TABLE [dbo].[SupplyItem] ALTER COLUMN [id] INT NOT NULL;
ALTER TABLE [dbo].[SupplyItem] ALTER COLUMN [supplyId] INT NOT NULL;
ALTER TABLE [dbo].[SupplyItem] ALTER COLUMN [ingredientItemId] INT NOT NULL;
ALTER TABLE [dbo].[SupplyItem] ADD CONSTRAINT SupplyItem_pkey PRIMARY KEY CLUSTERED ([id]);

-- AlterTable
ALTER TABLE [dbo].[User] DROP CONSTRAINT [User_pkey];
ALTER TABLE [dbo].[User] ALTER COLUMN [id] INT NOT NULL;
ALTER TABLE [dbo].[User] ADD CONSTRAINT User_pkey PRIMARY KEY CLUSTERED ([id]);

-- AddForeignKey
ALTER TABLE [dbo].[OrderItem] ADD CONSTRAINT [OrderItem_productId_fkey] FOREIGN KEY ([productId]) REFERENCES [dbo].[Product]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[OrderItem] ADD CONSTRAINT [OrderItem_orderId_fkey] FOREIGN KEY ([orderId]) REFERENCES [dbo].[Order]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[SupplyItem] ADD CONSTRAINT [SupplyItem_ingredientItemId_fkey] FOREIGN KEY ([ingredientItemId]) REFERENCES [dbo].[IngredientItem]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[SupplyItem] ADD CONSTRAINT [SupplyItem_supplyId_fkey] FOREIGN KEY ([supplyId]) REFERENCES [dbo].[Supply]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Recipe] ADD CONSTRAINT [Recipe_productId_fkey] FOREIGN KEY ([productId]) REFERENCES [dbo].[Product]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Recipe] ADD CONSTRAINT [Recipe_ingredientItemId_fkey] FOREIGN KEY ([ingredientItemId]) REFERENCES [dbo].[IngredientItem]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Supply] ADD CONSTRAINT [Supply_staffId_fkey] FOREIGN KEY ([staffId]) REFERENCES [dbo].[User]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[ShoppingCart] ADD CONSTRAINT [ShoppingCart_userId_fkey] FOREIGN KEY ([userId]) REFERENCES [dbo].[User]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[IngredientInventory] ADD CONSTRAINT [IngredientInventory_ingredientItemId_fkey] FOREIGN KEY ([ingredientItemId]) REFERENCES [dbo].[IngredientItem]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[IngredientInventory] ADD CONSTRAINT [IngredientInventory_inventoryId_fkey] FOREIGN KEY ([inventoryId]) REFERENCES [dbo].[Inventory]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Order] ADD CONSTRAINT [Order_userId_fkey] FOREIGN KEY ([userId]) REFERENCES [dbo].[User]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[InventoryTransaction] ADD CONSTRAINT [InventoryTransaction_inventoryId_fkey] FOREIGN KEY ([inventoryId]) REFERENCES [dbo].[Inventory]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[InventoryTransaction] ADD CONSTRAINT [InventoryTransaction_staffId_fkey] FOREIGN KEY ([staffId]) REFERENCES [dbo].[User]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[ShoppingCartItem] ADD CONSTRAINT [ShoppingCartItem_shoppingCartId_fkey] FOREIGN KEY ([shoppingCartId]) REFERENCES [dbo].[ShoppingCart]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[ShoppingCartItem] ADD CONSTRAINT [ShoppingCartItem_productId_fkey] FOREIGN KEY ([productId]) REFERENCES [dbo].[Product]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[ShippingAddress] ADD CONSTRAINT [ShippingAddress_userId_fkey] FOREIGN KEY ([userId]) REFERENCES [dbo].[User]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
