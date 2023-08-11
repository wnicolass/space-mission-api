/*
  Warnings:

  - Added the required column `createdBy` to the `Launch` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Launch" ADD COLUMN     "createdBy" VARCHAR(255) NOT NULL;

-- AddForeignKey
ALTER TABLE "Launch" ADD CONSTRAINT "Launch_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "UserProfile"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
