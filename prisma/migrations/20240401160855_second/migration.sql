-- DropForeignKey
ALTER TABLE "class" DROP CONSTRAINT "class_formationId_fkey";

-- DropForeignKey
ALTER TABLE "class" DROP CONSTRAINT "class_instructorId_fkey";

-- AddForeignKey
ALTER TABLE "class" ADD CONSTRAINT "class_instructorId_fkey" FOREIGN KEY ("instructorId") REFERENCES "Instructor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "class" ADD CONSTRAINT "class_formationId_fkey" FOREIGN KEY ("formationId") REFERENCES "formations"("id") ON DELETE CASCADE ON UPDATE CASCADE;
