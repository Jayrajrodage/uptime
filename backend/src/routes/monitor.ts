import express from "express";
import {
  createEmailAlert,
  createMonitor,
  deleteMonitor,
  getMonitorDetails,
  getMonitorNames,
  updateMonitor,
} from "../controller/monitor";

const router = express.Router();

router.post("/", createMonitor);

router.get("/names", getMonitorNames);

router.get("/:id", getMonitorDetails);

router.put("/:id", updateMonitor);

router.delete("/:id", deleteMonitor);

export default router;
