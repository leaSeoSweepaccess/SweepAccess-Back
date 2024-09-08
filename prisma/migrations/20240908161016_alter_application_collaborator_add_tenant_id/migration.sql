/*
  Warnings:

  - The primary key for the `ApplicationCollaborator` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `tenantId` to the `ApplicationCollaborator` table without a default value. This is not possible if the table is not empty.
  - Made the column `email` on table `Tenant` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "ApplicationCollaborator" DROP CONSTRAINT "ApplicationCollaborator_pkey",
ADD COLUMN     "tenantId" TEXT NOT NULL,
ADD CONSTRAINT "ApplicationCollaborator_pkey" PRIMARY KEY ("applicationId", "collaboratorId", "tenantId");

-- AlterTable
ALTER TABLE "Tenant" ALTER COLUMN "email" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "ApplicationCollaborator" ADD CONSTRAINT "ApplicationCollaborator_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
