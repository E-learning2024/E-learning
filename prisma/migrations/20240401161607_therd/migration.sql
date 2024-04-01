-- DropForeignKey
ALTER TABLE "Material" DROP CONSTRAINT "Material_classId_fkey";

-- DropForeignKey
ALTER TABLE "administrator" DROP CONSTRAINT "administrator_accessLevelId_fkey";

-- DropForeignKey
ALTER TABLE "teamAdmin" DROP CONSTRAINT "teamAdmin_leaderId_fkey";

-- AddForeignKey
ALTER TABLE "administrator" ADD CONSTRAINT "administrator_accessLevelId_fkey" FOREIGN KEY ("accessLevelId") REFERENCES "accessLevel"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "teamAdmin" ADD CONSTRAINT "teamAdmin_leaderId_fkey" FOREIGN KEY ("leaderId") REFERENCES "administrator"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Material" ADD CONSTRAINT "Material_classId_fkey" FOREIGN KEY ("classId") REFERENCES "class"("id") ON DELETE CASCADE ON UPDATE CASCADE;
