/*
  Warnings:

  - You are about to drop the column `forks` on the `Course` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Course" DROP COLUMN "forks",
ADD COLUMN     "forkedFromId" TEXT;

-- AddForeignKey
ALTER TABLE "Course" ADD CONSTRAINT "Course_forkedFromId_fkey" FOREIGN KEY ("forkedFromId") REFERENCES "Course"("courseId") ON DELETE SET NULL ON UPDATE CASCADE;
