import express from "express";
import { getProfile } from "../controller/profile";

const router = express.Router();

router.get("/", getProfile);

export default router;
