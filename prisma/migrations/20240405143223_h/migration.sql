-- CreateEnum
CREATE TYPE "Status" AS ENUM ('PENDENTE', 'CONFIRMADO');

-- AlterTable
ALTER TABLE "Enrollment" ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'PENDENTE';
