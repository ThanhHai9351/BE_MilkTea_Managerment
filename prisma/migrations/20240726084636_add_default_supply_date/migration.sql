/*
  Warnings:

  - You are about to drop the column `ingredientId` on the `SupplyItem` table. All the data in the column will be lost.
  - Added the required column `ingredientItemId` to the `SupplyItem` table without a default value. This is not possible if the table is not empty.

*/
BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[SupplyItem] DROP CONSTRAINT [SupplyItem_ingredientId_fkey];

-- AlterTable
ALTER TABLE [dbo].[Supply] ADD CONSTRAINT [Supply_supplyDate_df] DEFAULT CURRENT_TIMESTAMP FOR [supplyDate];

-- AlterTable
ALTER TABLE [dbo].[SupplyItem] DROP COLUMN [ingredientId];
ALTER TABLE [dbo].[SupplyItem] ADD [ingredientItemId] BIGINT NOT NULL;

-- AddForeignKey
ALTER TABLE [dbo].[SupplyItem] ADD CONSTRAINT [SupplyItem_ingredientItemId_fkey] FOREIGN KEY ([ingredientItemId]) REFERENCES [dbo].[IngredientItem]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
