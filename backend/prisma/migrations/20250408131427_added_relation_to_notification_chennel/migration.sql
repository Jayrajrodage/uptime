-- AlterTable
ALTER TABLE "NotificationChannels" ADD COLUMN     "clerkId" TEXT;

-- AddForeignKey
ALTER TABLE "NotificationChannels" ADD CONSTRAINT "NotificationChannels_clerkId_fkey" FOREIGN KEY ("clerkId") REFERENCES "User"("clerkId") ON DELETE SET NULL ON UPDATE CASCADE;
