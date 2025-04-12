import express from "express";
import { createMonitor, getMonitorNames } from "../controller/monitor";

const router = express.Router();

router.post("/", createMonitor);

router.get("/names", getMonitorNames);

// router.get("/:id", getPageDetails);

// router.put("/:id", updatePage);

// router.delete("/:id", deletePage);

export default router;
