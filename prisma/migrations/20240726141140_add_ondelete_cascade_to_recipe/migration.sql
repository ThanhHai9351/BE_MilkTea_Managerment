BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[Recipe] DROP CONSTRAINT [Recipe_ingredientItemId_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[Recipe] DROP CONSTRAINT [Recipe_productId_fkey];

-- AddForeignKey
ALTER TABLE [dbo].[Recipe] ADD CONSTRAINT [Recipe_productId_fkey] FOREIGN KEY ([productId]) REFERENCES [dbo].[Product]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Recipe] ADD CONSTRAINT [Recipe_ingredientItemId_fkey] FOREIGN KEY ([ingredientItemId]) REFERENCES [dbo].[IngredientItem]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
