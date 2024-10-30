/*
  Warnings:

  - You are about to drop the `Ingredient` table. If the table is not empty, all the data it contains will be lost.

*/
BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[Ingredient] DROP CONSTRAINT [Ingredient_inventoryId_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[InventoryTransaction] DROP CONSTRAINT [InventoryTransaction_ingredientId_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[Recipe] DROP CONSTRAINT [Recipe_ingredientId_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[SupplyItem] DROP CONSTRAINT [SupplyItem_ingredientId_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[Topping] DROP CONSTRAINT [Topping_ingredientId_fkey];

-- DropTable
DROP TABLE [dbo].[Ingredient];

-- CreateTable
CREATE TABLE [dbo].[IngredientInventory] (
    [id] BIGINT NOT NULL IDENTITY(1,1),
    [name] NVARCHAR(1000) NOT NULL,
    [unit] NVARCHAR(1000) NOT NULL,
    [price] FLOAT(53) NOT NULL,
    [toppingPrice] FLOAT(53) NOT NULL,
    [inventoryId] BIGINT NOT NULL,
    CONSTRAINT [IngredientInventory_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[IngredientItem] (
    [id] BIGINT NOT NULL IDENTITY(1,1),
    [name] NVARCHAR(1000) NOT NULL,
    [price] FLOAT(53) NOT NULL,
    CONSTRAINT [IngredientItem_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- AddForeignKey
ALTER TABLE [dbo].[SupplyItem] ADD CONSTRAINT [SupplyItem_ingredientId_fkey] FOREIGN KEY ([ingredientId]) REFERENCES [dbo].[IngredientInventory]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Recipe] ADD CONSTRAINT [Recipe_ingredientId_fkey] FOREIGN KEY ([ingredientId]) REFERENCES [dbo].[IngredientInventory]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[IngredientInventory] ADD CONSTRAINT [IngredientInventory_inventoryId_fkey] FOREIGN KEY ([inventoryId]) REFERENCES [dbo].[Inventory]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[InventoryTransaction] ADD CONSTRAINT [InventoryTransaction_ingredientId_fkey] FOREIGN KEY ([ingredientId]) REFERENCES [dbo].[IngredientInventory]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Topping] ADD CONSTRAINT [Topping_ingredientId_fkey] FOREIGN KEY ([ingredientId]) REFERENCES [dbo].[IngredientInventory]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
