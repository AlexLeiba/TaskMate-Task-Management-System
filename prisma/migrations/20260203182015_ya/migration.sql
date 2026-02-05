-- DropForeignKey
ALTER TABLE "Checklist" DROP CONSTRAINT "Checklist_cardId_fkey";

-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_cardId_fkey";

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_cardId_fkey" FOREIGN KEY ("cardId") REFERENCES "CardDetails"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Checklist" ADD CONSTRAINT "Checklist_cardId_fkey" FOREIGN KEY ("cardId") REFERENCES "CardDetails"("id") ON DELETE CASCADE ON UPDATE CASCADE;
