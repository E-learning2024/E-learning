/*
  Warnings:

  - Added the required column `password` to the `Instructor` table without a default value. This is not possible if the table is not empty.
  - Made the column `name` on table `administrator` required. This step will fail if there are existing NULL values in that column.
  - Made the column `phone` on table `administrator` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Instructor" ADD COLUMN     "password" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "administrator" ALTER COLUMN "name" SET NOT NULL,
ALTER COLUMN "phone" SET NOT NULL;
