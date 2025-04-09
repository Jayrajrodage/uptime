/*
  Warnings:

  - Added the required column `channeldata` to the `NotificationChannels` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "NotificationChannels" ADD COLUMN     "channeldata" TEXT NOT NULL;
