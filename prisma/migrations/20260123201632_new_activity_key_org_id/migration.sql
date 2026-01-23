/*
  Warnings:

  - Added the required column `orgId` to the `Activity` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Activity" ADD COLUMN     "orgId" TEXT NOT NULL;
