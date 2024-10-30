/*
  Warnings:

  - You are about to drop the column `totalPrice` on the `SupplyItem` table. All the data in the column will be lost.
  - Added the required column `price` to the `SupplyItem` table without a default value. This is not possible if the table is not empty.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[SupplyItem] DROP COLUMN [totalPrice];
ALTER TABLE [dbo].[SupplyItem] ADD [price] FLOAT(53) NOT NULL;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
