/*
  Warnings:

  - Added the required column `instructorId` to the `program_content` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "program_content" ADD COLUMN     "data" TEXT,
ADD COLUMN     "duration" TEXT,
ADD COLUMN     "instructorId" INTEGER NOT NULL,
ADD COLUMN     "week" TEXT;

-- AddForeignKey
ALTER TABLE "program_content" ADD CONSTRAINT "program_content_instructorId_fkey" FOREIGN KEY ("instructorId") REFERENCES "Instructor"("id") ON DELETE CASCADE ON UPDATE CASCADE;
