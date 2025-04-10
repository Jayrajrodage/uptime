import express from "express";
import {
  createChannel,
  deleteChannel,
  getChannelDetails,
  getChannels,
  updateChannel,
} from "../controller/channel";

const router = express.Router();

router.post("/", createChannel);

router.get("/", getChannels);

router.get("/:id", getChannelDetails);

router.put("/:id", updateChannel);

router.delete("/:id", deleteChannel);

export default router;
