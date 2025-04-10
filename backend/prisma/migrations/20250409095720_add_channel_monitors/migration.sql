/*
  Warnings:

  - You are about to drop the column `monitorId` on the `NotificationChannels` table. All the data in the column will be lost.
  - Made the column `clerkId` on table `NotificationChannels` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "NotificationChannels" DROP CONSTRAINT "NotificationChannels_clerkId_fkey";

-- DropForeignKey
ALTER TABLE "NotificationChannels" DROP CONSTRAINT "NotificationChannels_monitorId_fkey";

-- AlterTable
ALTER TABLE "NotificationChannels" DROP COLUMN "monitorId",
ALTER COLUMN "clerkId" SET NOT NULL;

-- CreateTable
CREATE TABLE "_ChannelMonitors" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_ChannelMonitors_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_ChannelMonitors_B_index" ON "_ChannelMonitors"("B");

-- AddForeignKey
ALTER TABLE "NotificationChannels" ADD CONSTRAINT "NotificationChannels_clerkId_fkey" FOREIGN KEY ("clerkId") REFERENCES "User"("clerkId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ChannelMonitors" ADD CONSTRAINT "_ChannelMonitors_A_fkey" FOREIGN KEY ("A") REFERENCES "Monitors"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ChannelMonitors" ADD CONSTRAINT "_ChannelMonitors_B_fkey" FOREIGN KEY ("B") REFERENCES "NotificationChannels"("id") ON DELETE CASCADE ON UPDATE CASCADE;
