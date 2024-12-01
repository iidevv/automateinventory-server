/*
  Warnings:

  - You are about to drop the column `name` on the `instances` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[companyName]` on the table `instances` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[companyWebsite]` on the table `instances` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[phoneNumber]` on the table `instances` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `companyName` to the `instances` table without a default value. This is not possible if the table is not empty.
  - Added the required column `companyWebsite` to the `instances` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phoneNumber` to the `instances` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "instances_name_key";

-- AlterTable
ALTER TABLE "instances" DROP COLUMN "name",
ADD COLUMN     "companyName" TEXT NOT NULL,
ADD COLUMN     "companyWebsite" TEXT NOT NULL,
ADD COLUMN     "phoneNumber" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "instances_companyName_key" ON "instances"("companyName");

-- CreateIndex
CREATE UNIQUE INDEX "instances_companyWebsite_key" ON "instances"("companyWebsite");

-- CreateIndex
CREATE UNIQUE INDEX "instances_phoneNumber_key" ON "instances"("phoneNumber");
