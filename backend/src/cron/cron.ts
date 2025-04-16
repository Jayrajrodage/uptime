import cron from "node-cron";

const logTime = (label: string) => {
  console.log(`[${label}] Job executed at: ${new Date().toLocaleString()}`);
};

// Every 30 minutes
cron.schedule("*/30 * * * *", () => {
  logTime("Every 30 Minutes");
});

// Every 1 hour
cron.schedule("0 * * * *", () => {
  logTime("Every 1 Hour");
});
