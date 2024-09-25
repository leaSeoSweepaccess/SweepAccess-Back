-- AlterTable
ALTER TABLE "UserSession" ADD COLUMN     "createdBy" TEXT;

-- AlterTable
ALTER TABLE "UserToken" ADD COLUMN     "createdBy" TEXT;
