/*
  Warnings:

  - You are about to drop the column `assignedToId` on the `Card` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Card" DROP CONSTRAINT "Card_assignedToId_fkey";

-- AlterTable
ALTER TABLE "Card" DROP COLUMN "assignedToId",
ADD COLUMN     "assignedToEmail" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Card" ADD CONSTRAINT "Card_assignedToEmail_fkey" FOREIGN KEY ("assignedToEmail") REFERENCES "User"("email") ON DELETE SET NULL ON UPDATE CASCADE;
