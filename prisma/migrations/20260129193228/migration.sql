/*
  Warnings:

  - A unique constraint covering the columns `[assignedToEmail]` on the table `Card` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "CardDetails" DROP CONSTRAINT "CardDetails_cardId_fkey";

-- CreateIndex
CREATE UNIQUE INDEX "Card_assignedToEmail_key" ON "Card"("assignedToEmail");

-- AddForeignKey
ALTER TABLE "CardDetails" ADD CONSTRAINT "CardDetails_cardId_fkey" FOREIGN KEY ("cardId") REFERENCES "Card"("id") ON DELETE CASCADE ON UPDATE CASCADE;
