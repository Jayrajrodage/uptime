-- CreateEnum
CREATE TYPE "Plan" AS ENUM ('FREE', 'PRO', 'UNLIMITED');

-- CreateEnum
CREATE TYPE "Channel" AS ENUM ('Email', 'SMS', 'Discord', 'slack');

-- CreateEnum
CREATE TYPE "Frequency" AS ENUM ('10m', '20m', '1Hr');

-- CreateEnum
CREATE TYPE "SubRegions" AS ENUM ('USA', 'Canada', 'Mexico', 'Germany', 'France', 'UK', 'India', 'China', 'Japan', 'Brazil', 'Argentina', 'Chile', 'Nigeria', 'South Africa', 'Kenya', 'Australia', 'New Zealand');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "clerkId" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "plan" "Plan" NOT NULL DEFAULT 'FREE',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Monitors" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "headers" JSONB[] DEFAULT ARRAY[]::JSONB[],
    "frequency" "Frequency" NOT NULL,
    "timeout" INTEGER NOT NULL DEFAULT 45000,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Monitors_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SubRegion" (
    "id" SERIAL NOT NULL,
    "name" "SubRegions" NOT NULL,
    "monitorId" INTEGER NOT NULL,

    CONSTRAINT "SubRegion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NotificationChannels" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "channel" "Channel" NOT NULL,
    "monitorId" INTEGER,

    CONSTRAINT "NotificationChannels_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StatusPages" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "monitorId" INTEGER,

    CONSTRAINT "StatusPages_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_clerkId_key" ON "User"("clerkId");

-- CreateIndex
CREATE UNIQUE INDEX "StatusPages_monitorId_key" ON "StatusPages"("monitorId");

-- AddForeignKey
ALTER TABLE "SubRegion" ADD CONSTRAINT "SubRegion_monitorId_fkey" FOREIGN KEY ("monitorId") REFERENCES "Monitors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NotificationChannels" ADD CONSTRAINT "NotificationChannels_monitorId_fkey" FOREIGN KEY ("monitorId") REFERENCES "Monitors"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StatusPages" ADD CONSTRAINT "StatusPages_monitorId_fkey" FOREIGN KEY ("monitorId") REFERENCES "Monitors"("id") ON DELETE SET NULL ON UPDATE CASCADE;
