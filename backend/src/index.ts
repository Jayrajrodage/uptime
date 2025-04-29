import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import profile from "./routes/profile";
import channel from "./routes/channel";
import statusPages from "./routes/statusPages";
import monitor from "./routes/monitor";
import { auth } from "./middleware/auth";
import cookieParser from "cookie-parser";
import { createEmailAlert } from "./controller/monitor";
import { initializeRedisClient } from "./utils/redisClient";
import "./cron/cron";
import "./worker/worker";
import { startWorker } from "./worker/worker";
dotenv.config();

const app = express();

const allowedOrigins = [
  "http://localhost:5173", // Local dev
  /\.localhost:5173$/, // Local subdomains
  /\.uptimely\.top$/, // All subdomains of uptimely.top (prod)
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true); // allow non-browser tools

      const isAllowed = allowedOrigins.some((pattern) => {
        return typeof pattern === "string"
          ? origin === pattern
          : pattern.test(origin);
      });

      if (isAllowed) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(express.json({ limit: "10mb" }));
app.use(cookieParser());
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`App listing on port ${port}`));

//profile
app.use("/api/profile", auth, profile);
//channel
app.use("/api/channel", auth, channel);
//status pages
app.use("/api/status-pages", auth, statusPages);
//monitor
app.use("/api/monitor", auth, monitor);

app.get("/", (req, res) => {
  res.status(200).send("Hello from uptime server!");
});

//TODO: test this endpoint on production
app.post("/api/alert", createEmailAlert);

const startApp = async () => {
  await initializeRedisClient();
  await startWorker();
};

// Start your application
startApp().catch((err) => {
  console.error("Error starting the app:", err);
});
