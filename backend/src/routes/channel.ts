import express from "express";
import { createChannel } from "../controller/channel";

const router = express.Router();

router.post("/", createChannel);

export default router;
