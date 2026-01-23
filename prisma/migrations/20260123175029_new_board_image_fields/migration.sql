/*
  Warnings:

  - You are about to drop the column `imageUrl` on the `Board` table. All the data in the column will be lost.
  - Added the required column `bgImageUrl` to the `Board` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cardImageUrl` to the `Board` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Board" DROP COLUMN "imageUrl",
ADD COLUMN     "bgImageUrl" TEXT NOT NULL,
ADD COLUMN     "cardImageUrl" TEXT NOT NULL;
