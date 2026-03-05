/*
  Warnings:

  - You are about to drop the `DoneCardTickets` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "DoneCardTickets" DROP CONSTRAINT "DoneCardTickets_assignedToEmail_fkey";

-- DropTable
DROP TABLE "DoneCardTickets";

-- CreateTable
CREATE TABLE "UserDoneCardTickets" (
    "id" TEXT NOT NULL,
    "cardId" TEXT NOT NULL,
    "assignedToEmail" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "UserDoneCardTickets_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UserDoneCardTickets" ADD CONSTRAINT "UserDoneCardTickets_assignedToEmail_fkey" FOREIGN KEY ("assignedToEmail") REFERENCES "User"("email") ON DELETE RESTRICT ON UPDATE CASCADE;
