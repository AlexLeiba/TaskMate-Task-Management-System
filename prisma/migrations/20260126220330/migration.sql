/*
  Warnings:

  - A unique constraint covering the columns `[assignedToEmail]` on the table `Card` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Card_assignedToEmail_key" ON "Card"("assignedToEmail");
