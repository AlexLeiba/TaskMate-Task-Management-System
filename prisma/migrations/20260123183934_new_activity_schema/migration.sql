/*
  Warnings:

  - You are about to drop the column `boardName` on the `Activity` table. All the data in the column will be lost.
  - You are about to drop the column `listName` on the `Activity` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Activity" DROP CONSTRAINT "Activity_cardId_fkey";

-- AlterTable
ALTER TABLE "Activity" DROP COLUMN "boardName",
DROP COLUMN "listName",
ADD COLUMN     "boardId" TEXT,
ALTER COLUMN "cardId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Activity" ADD CONSTRAINT "Activity_cardId_fkey" FOREIGN KEY ("cardId") REFERENCES "CardDetails"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Activity" ADD CONSTRAINT "Activity_boardId_fkey" FOREIGN KEY ("boardId") REFERENCES "Board"("id") ON DELETE SET NULL ON UPDATE CASCADE;
