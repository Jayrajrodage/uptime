import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import profile from "./routes/profile";
import channel from "./routes/channel";
import { auth } from "./middleware/auth";
import cookieParser from "cookie-parser";
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

app.get("/", (req, res) => {
  // Send a response to the client
  res.status(200).send("Hello from uptime server!");
});
