BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[Order] ADD [additional] NVARCHAR(1000);

-- CreateTable
CREATE TABLE [dbo].[IngredientSummary] (
    [id] INT NOT NULL IDENTITY(1,1),
    [ingredientItemId] INT NOT NULL,
    [quantity] INT NOT NULL,
    [summaryDate] DATETIME2 NOT NULL CONSTRAINT [IngredientSummary_summaryDate_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [IngredientSummary_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- AddForeignKey
ALTER TABLE [dbo].[IngredientSummary] ADD CONSTRAINT [IngredientSummary_ingredientItemId_fkey] FOREIGN KEY ([ingredientItemId]) REFERENCES [dbo].[IngredientItem]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
