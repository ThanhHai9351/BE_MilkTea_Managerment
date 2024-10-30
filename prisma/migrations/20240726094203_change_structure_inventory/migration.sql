/*
  Warnings:

  - You are about to drop the column `name` on the `IngredientInventory` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `IngredientInventory` table. All the data in the column will be lost.
  - You are about to drop the column `toppingPrice` on the `IngredientInventory` table. All the data in the column will be lost.
  - You are about to drop the column `unit` on the `IngredientInventory` table. All the data in the column will be lost.
  - You are about to drop the column `ingredientId` on the `InventoryTransaction` table. All the data in the column will be lost.
  - You are about to drop the column `ingredientId` on the `Recipe` table. All the data in the column will be lost.
  - You are about to drop the `Topping` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `ingredientItemId` to the `IngredientInventory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `area` to the `Inventory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `inventoryId` to the `InventoryTransaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ingredientItemId` to the `Recipe` table without a default value. This is not possible if the table is not empty.

*/
BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[InventoryTransaction] DROP CONSTRAINT [InventoryTransaction_ingredientId_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[Recipe] DROP CONSTRAINT [Recipe_ingredientId_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[Topping] DROP CONSTRAINT [Topping_ingredientId_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[Topping] DROP CONSTRAINT [Topping_orderId_fkey];

-- AlterTable
ALTER TABLE [dbo].[IngredientInventory] DROP COLUMN [name],
[price],
[toppingPrice],
[unit];
ALTER TABLE [dbo].[IngredientInventory] ADD [ingredientItemId] BIGINT NOT NULL;

-- AlterTable
ALTER TABLE [dbo].[Inventory] ADD [area] NVARCHAR(1000) NOT NULL;

-- AlterTable
ALTER TABLE [dbo].[InventoryTransaction] DROP COLUMN [ingredientId];
ALTER TABLE [dbo].[InventoryTransaction] ADD [inventoryId] BIGINT NOT NULL;

-- AlterTable
ALTER TABLE [dbo].[Recipe] DROP COLUMN [ingredientId];
ALTER TABLE [dbo].[Recipe] ADD [ingredientItemId] BIGINT NOT NULL;

-- DropTable
DROP TABLE [dbo].[Topping];

-- AddForeignKey
ALTER TABLE [dbo].[Recipe] ADD CONSTRAINT [Recipe_ingredientItemId_fkey] FOREIGN KEY ([ingredientItemId]) REFERENCES [dbo].[IngredientItem]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[IngredientInventory] ADD CONSTRAINT [IngredientInventory_ingredientItemId_fkey] FOREIGN KEY ([ingredientItemId]) REFERENCES [dbo].[IngredientItem]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[InventoryTransaction] ADD CONSTRAINT [InventoryTransaction_inventoryId_fkey] FOREIGN KEY ([inventoryId]) REFERENCES [dbo].[Inventory]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
