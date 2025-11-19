-- CreateEnum
CREATE TYPE "planType" AS ENUM ('TRIAL', 'BUDDY', 'PROFESSIONAL');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "credits" INTEGER NOT NULL DEFAULT 3,
ADD COLUMN     "plan" "planType" NOT NULL DEFAULT 'TRIAL';

-- CreateTable
CREATE TABLE "ProcessedPayment" (
    "id" TEXT NOT NULL,
    "razorpayPaymentId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "plan" "planType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ProcessedPayment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ProcessedPayment_razorpayPaymentId_key" ON "ProcessedPayment"("razorpayPaymentId");

-- AddForeignKey
ALTER TABLE "ProcessedPayment" ADD CONSTRAINT "ProcessedPayment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
