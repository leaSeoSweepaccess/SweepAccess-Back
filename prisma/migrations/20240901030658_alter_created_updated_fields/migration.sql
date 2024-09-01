/*
  Warnings:

  - You are about to drop the column `createAt` on the `Application` table. All the data in the column will be lost.
  - You are about to drop the column `updateAt` on the `Application` table. All the data in the column will be lost.
  - You are about to drop the column `createAt` on the `ApplicationCollaborator` table. All the data in the column will be lost.
  - You are about to drop the column `updateAt` on the `ApplicationCollaborator` table. All the data in the column will be lost.
  - You are about to drop the column `createAt` on the `ApplicationTenant` table. All the data in the column will be lost.
  - You are about to drop the column `updateAt` on the `ApplicationTenant` table. All the data in the column will be lost.
  - You are about to drop the column `createAt` on the `Collaborator` table. All the data in the column will be lost.
  - You are about to drop the column `updateAt` on the `Collaborator` table. All the data in the column will be lost.
  - You are about to drop the column `createAt` on the `CollaboratorTenant` table. All the data in the column will be lost.
  - You are about to drop the column `updateAt` on the `CollaboratorTenant` table. All the data in the column will be lost.
  - You are about to drop the column `createAt` on the `Tenant` table. All the data in the column will be lost.
  - You are about to drop the column `updateAt` on the `Tenant` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Application" DROP COLUMN "createAt",
DROP COLUMN "updateAt",
ADD COLUMN     "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "ApplicationCollaborator" DROP COLUMN "createAt",
DROP COLUMN "updateAt",
ADD COLUMN     "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "ApplicationTenant" DROP COLUMN "createAt",
DROP COLUMN "updateAt",
ADD COLUMN     "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Collaborator" DROP COLUMN "createAt",
DROP COLUMN "updateAt",
ADD COLUMN     "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "CollaboratorTenant" DROP COLUMN "createAt",
DROP COLUMN "updateAt",
ADD COLUMN     "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Tenant" DROP COLUMN "createAt",
DROP COLUMN "updateAt",
ADD COLUMN     "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3);
