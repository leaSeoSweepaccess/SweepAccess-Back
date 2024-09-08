/*
  Warnings:

  - You are about to drop the `ApplicationCollaborator` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ApplicationCollaborator" DROP CONSTRAINT "ApplicationCollaborator_applicationId_fkey";

-- DropForeignKey
ALTER TABLE "ApplicationCollaborator" DROP CONSTRAINT "ApplicationCollaborator_collaboratorId_fkey";

-- DropForeignKey
ALTER TABLE "ApplicationCollaborator" DROP CONSTRAINT "ApplicationCollaborator_tenantId_fkey";

-- DropTable
DROP TABLE "ApplicationCollaborator";

-- CreateTable
CREATE TABLE "ApplicationCollaboratorTenant" (
    "applicationId" TEXT NOT NULL,
    "collaboratorId" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "jsonData" JSONB,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "createdBy" TEXT,
    "updatedAt" TIMESTAMP(3),
    "updatedBy" TEXT,
    "deletedAt" TIMESTAMP(3),
    "deletedBy" TEXT,

    CONSTRAINT "ApplicationCollaboratorTenant_pkey" PRIMARY KEY ("applicationId","collaboratorId","tenantId")
);

-- AddForeignKey
ALTER TABLE "ApplicationCollaboratorTenant" ADD CONSTRAINT "ApplicationCollaboratorTenant_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "Application"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ApplicationCollaboratorTenant" ADD CONSTRAINT "ApplicationCollaboratorTenant_collaboratorId_fkey" FOREIGN KEY ("collaboratorId") REFERENCES "Collaborator"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ApplicationCollaboratorTenant" ADD CONSTRAINT "ApplicationCollaboratorTenant_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
