/*
  Warnings:

  - You are about to drop the column `instructorId` on the `class` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "class" DROP CONSTRAINT "class_instructorId_fkey";

-- AlterTable
ALTER TABLE "class" DROP COLUMN "instructorId";

-- CreateTable
CREATE TABLE "program_content" (
    "id" SERIAL NOT NULL,
    "formationId" INTEGER NOT NULL,
    "name" TEXT,
    "description" TEXT,
    "time" TEXT,

    CONSTRAINT "program_content_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_instructors" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_instructors_AB_unique" ON "_instructors"("A", "B");

-- CreateIndex
CREATE INDEX "_instructors_B_index" ON "_instructors"("B");

-- AddForeignKey
ALTER TABLE "program_content" ADD CONSTRAINT "program_content_formationId_fkey" FOREIGN KEY ("formationId") REFERENCES "formations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_instructors" ADD CONSTRAINT "_instructors_A_fkey" FOREIGN KEY ("A") REFERENCES "class"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_instructors" ADD CONSTRAINT "_instructors_B_fkey" FOREIGN KEY ("B") REFERENCES "Instructor"("id") ON DELETE CASCADE ON UPDATE CASCADE;
