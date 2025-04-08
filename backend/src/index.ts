import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import profile from "./routes/profile";
import { clerkMiddleware } from "@clerk/express";
import { auth } from "./middleware/auth";
dotenv.config();

const app = express();

// middleware
app.use(clerkMiddleware());
app.use(cors());
app.use(express.json({ limit: "10mb" }));

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`App listing on port ${port}`));

//profile
app.use("/api/profile", auth, profile);

app.get("/", (req, res) => {
  // Send a response to the client
  res.status(200).send("Hello from uptime server!");
});
