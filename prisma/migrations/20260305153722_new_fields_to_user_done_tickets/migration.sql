/*
  Warnings:

  - Added the required column `boardId` to the `UserDoneCardTickets` table without a default value. This is not possible if the table is not empty.
  - Added the required column `orgId` to the `UserDoneCardTickets` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UserDoneCardTickets" ADD COLUMN     "boardId" TEXT NOT NULL,
ADD COLUMN     "orgId" TEXT NOT NULL;
