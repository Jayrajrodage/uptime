import cron from "node-cron";
import prisma from "../utils/db";

const logTime = (label: string) => {
  console.log(`[${label}] Job executed at: ${new Date().toLocaleString()}`);
};

// Every 30 minutes
cron.schedule("*/30 * * * *", async () => {
  const monitors = await prisma.monitors.findMany({
    where: { isActive: true, isDeleted: false, frequency: "ThirtyMin" },
  });
});

// Every 1 hour
cron.schedule("0 * * * *", () => {
  logTime("Every 1 Hour");
});
