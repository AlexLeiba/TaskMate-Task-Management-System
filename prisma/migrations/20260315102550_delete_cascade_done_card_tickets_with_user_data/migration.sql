-- DropForeignKey
ALTER TABLE "UserDoneCardTickets" DROP CONSTRAINT "UserDoneCardTickets_assignedToEmail_fkey";

-- AddForeignKey
ALTER TABLE "UserDoneCardTickets" ADD CONSTRAINT "UserDoneCardTickets_assignedToEmail_fkey" FOREIGN KEY ("assignedToEmail") REFERENCES "User"("email") ON DELETE CASCADE ON UPDATE CASCADE;
