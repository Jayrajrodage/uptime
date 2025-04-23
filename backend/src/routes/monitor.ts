import express from "express";
import {
  getMonitors,
  createMonitor,
  deleteMonitor,
  getMonitorDetails,
  getMonitorNames,
  updateMonitor,
  getMonitorInfo,
} from "../controller/monitor";

const router = express.Router();

router.post("/", createMonitor);

router.get("/", getMonitors);

router.get("/info/:id", getMonitorInfo);

router.get("/names", getMonitorNames);

router.get("/:id", getMonitorDetails);

router.put("/:id", updateMonitor);

router.delete("/:id", deleteMonitor);

export default router;
