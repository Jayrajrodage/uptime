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
import {
  initializeRedisClient,
  redisClient,
  uptimeQueue,
} from "./utils/redisClient";
import "./cron/cron";
import "./worker/worker";
import { startWorker } from "./worker/worker";
dotenv.config();

const app = express();

// middleware
app.use(cors({ credentials: true, origin: "http://localhost:5173" }));
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
  // Send a response to the client
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
