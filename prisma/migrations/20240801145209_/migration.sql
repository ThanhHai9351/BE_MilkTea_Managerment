BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[IngredientItem] ADD [isDeleted] BIT CONSTRAINT [IngredientItem_isDeleted_df] DEFAULT 0;

-- AlterTable
ALTER TABLE [dbo].[Product] ADD [isDeleted] BIT CONSTRAINT [Product_isDeleted_df] DEFAULT 0;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
