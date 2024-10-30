/*
  Warnings:

  - Added the required column `quantity` to the `IngredientInventory` table without a default value. This is not possible if the table is not empty.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[IngredientInventory] ADD [quantity] INT NOT NULL;

-- AlterTable
ALTER TABLE [dbo].[InventoryTransaction] ADD CONSTRAINT [InventoryTransaction_transactionDate_df] DEFAULT CURRENT_TIMESTAMP FOR [transactionDate];

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
