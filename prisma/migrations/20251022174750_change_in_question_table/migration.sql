/*
  Warnings:

  - Added the required column `optionNumber` to the `Question` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Question" ADD COLUMN     "optionNumber" INTEGER NOT NULL;
