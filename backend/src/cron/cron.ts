import cron from "node-cron";
import prisma from "../utils/db";
import { uptimeQueue } from "../utils/redisClient";
import { RegionToAwsRegion } from "../utils/types";

// Every 30 minutes
cron.schedule("*/30 * * * *", async () => {
  try {
    const monitors = await prisma.monitors.findMany({
      where: { isActive: true, isDeleted: false, frequency: "ThirtyMin" },
      include: { subRegions: true },
    });
    const bulkJobs = [];
    for (const monitor of monitors) {
      const { id, url, subRegions, headers } = monitor;
      for (const region of subRegions) {
        bulkJobs.push({
          name: "uptimeQueue",
          data: {
            monitorId: id,
            url,
            subregion: region.name,
            regionCode: RegionToAwsRegion[region.name],
            headers,
          },
          opts: {
            removeOnComplete: true,
            removeOnFail: false,
            delay: 2000,
          },
        });
      }
    }
    await uptimeQueue.addBulk(bulkJobs);
  } catch (error) {
    console.log("🚀 ~ cron.schedule ~ error:30min", error);
  }
});

// Every 1 hour
cron.schedule("0 * * * *", async () => {
  try {
    const monitors = await prisma.monitors.findMany({
      where: { isActive: true, isDeleted: false, frequency: "OneHr" },
      include: { subRegions: true },
    });
    const bulkJobs = [];
    for (const monitor of monitors) {
      const { id, url, subRegions, headers } = monitor;
      for (const region of subRegions) {
        bulkJobs.push({
          name: "uptimeQueue",
          data: {
            monitorId: id,
            url,
            subregion: region.name,
            regionCode: RegionToAwsRegion[region.name],
            headers,
          },
          opts: {
            removeOnComplete: true,
            removeOnFail: false,
            delay: 2000,
            backoff: {
              type: "exponential",
              delay: 3000,
            },
          },
        });
      }
    }
    await uptimeQueue.addBulk(bulkJobs);
  } catch (error) {
    console.log("🚀 ~ cron.schedule ~ error:30min", error);
  }
});
