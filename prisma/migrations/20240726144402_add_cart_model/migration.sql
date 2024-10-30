/*
  Warnings:

  - Added the required column `total_price` to the `ShoppingCart` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `ShoppingCartItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quantity` to the `ShoppingCartItem` table without a default value. This is not possible if the table is not empty.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[ShoppingCart] ADD [total_price] FLOAT(53) NOT NULL;

-- AlterTable
ALTER TABLE [dbo].[ShoppingCartItem] ADD [price] FLOAT(53) NOT NULL,
[quantity] INT NOT NULL;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
