/*
  Warnings:

  - You are about to drop the column `staffId` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the `Staff` table. If the table is not empty, all the data it contains will be lost.

*/
BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[Order] DROP CONSTRAINT [Order_staffId_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[Supply] DROP CONSTRAINT [Supply_staffId_fkey];

-- AlterTable
ALTER TABLE [dbo].[Order] DROP COLUMN [staffId];

-- DropTable
DROP TABLE [dbo].[Staff];

-- AddForeignKey
ALTER TABLE [dbo].[Supply] ADD CONSTRAINT [Supply_staffId_fkey] FOREIGN KEY ([staffId]) REFERENCES [dbo].[User]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
