import express from "express";
import {
  createProfile,
  getProfile,
  onPayment,
  onPaymentSuccess,
} from "../controller/profile";

const router = express.Router();

router.get("/", getProfile);

router.post("/create", createProfile);

router.post("/payment", onPayment);

router.post("/payment/success", onPaymentSuccess);

export default router;
