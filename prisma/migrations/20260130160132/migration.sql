-- DropForeignKey
ALTER TABLE "DueDate" DROP CONSTRAINT "DueDate_cardId_fkey";

-- AddForeignKey
ALTER TABLE "DueDate" ADD CONSTRAINT "DueDate_cardId_fkey" FOREIGN KEY ("cardId") REFERENCES "CardDetails"("id") ON DELETE CASCADE ON UPDATE CASCADE;
