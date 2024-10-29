/*
  Warnings:

  - You are about to alter the column `amount` on the `Order` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - You are about to drop the column `subscriptionTier` on the `Tenant` table. All the data in the column will be lost.
  - You are about to drop the column `seatId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `tenantId` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `Seat` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `Seat` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ProductTier" AS ENUM ('FREE', 'PAID');

-- CreateEnum
CREATE TYPE "SeatStatus" AS ENUM ('AVAILABLE', 'ASSIGNED', 'LOCKED');

-- CreateEnum
CREATE TYPE "PaymentCycle" AS ENUM ('MONTHLY', 'YEARLY');

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_seatId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_tenantId_fkey";

-- DropIndex
DROP INDEX "User_seatId_key";

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "createdBy" TEXT,
ADD COLUMN     "updatedBy" TEXT,
ALTER COLUMN "amount" SET DATA TYPE INTEGER,
ALTER COLUMN "createdAt" DROP NOT NULL,
ALTER COLUMN "updatedAt" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Seat" ADD COLUMN     "createdBy" TEXT,
ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "deletedBy" TEXT,
ADD COLUMN     "isDeleted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "status" "SeatStatus",
ADD COLUMN     "updatedBy" TEXT,
ADD COLUMN     "userId" TEXT NOT NULL,
ALTER COLUMN "createdAt" DROP NOT NULL,
ALTER COLUMN "updatedAt" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Tenant" DROP COLUMN "subscriptionTier",
ADD COLUMN     "paymentCycle" "PaymentCycle";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "seatId",
DROP COLUMN "tenantId";

-- DropEnum
DROP TYPE "SubscriptionTier";

-- CreateTable
CREATE TABLE "OrderDetail" (
    "id" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "currency" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "createdBy" TEXT,
    "updatedAt" TIMESTAMP(3),
    "updatedBy" TEXT,

    CONSTRAINT "OrderDetail_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "tier" "ProductTier" NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "currency" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "createdBy" TEXT,
    "updatedAt" TIMESTAMP(3),
    "updatedBy" TEXT,
    "deletedAt" TIMESTAMP(3),
    "deletedBy" TEXT,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_TenantToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_TenantToUser_AB_unique" ON "_TenantToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_TenantToUser_B_index" ON "_TenantToUser"("B");

-- CreateIndex
CREATE UNIQUE INDEX "Seat_userId_key" ON "Seat"("userId");

-- AddForeignKey
ALTER TABLE "OrderDetail" ADD CONSTRAINT "OrderDetail_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Seat" ADD CONSTRAINT "Seat_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TenantToUser" ADD CONSTRAINT "_TenantToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TenantToUser" ADD CONSTRAINT "_TenantToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
