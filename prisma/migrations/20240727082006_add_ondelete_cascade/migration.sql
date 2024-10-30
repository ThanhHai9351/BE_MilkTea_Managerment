BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[ShoppingCartItem] DROP CONSTRAINT [ShoppingCartItem_shoppingCartId_fkey];

-- AddForeignKey
ALTER TABLE [dbo].[ShoppingCartItem] ADD CONSTRAINT [ShoppingCartItem_shoppingCartId_fkey] FOREIGN KEY ([shoppingCartId]) REFERENCES [dbo].[ShoppingCart]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
