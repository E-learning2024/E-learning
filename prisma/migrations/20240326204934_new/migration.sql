/*
  Warnings:

  - You are about to drop the column `duration` on the `class` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Formation" ADD COLUMN     "duration" TEXT;

-- AlterTable
ALTER TABLE "Student" ALTER COLUMN "dateOfBirth" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "class" DROP COLUMN "duration",
ADD COLUMN     "student_quantity" INTEGER;
