import express from "express";
import { getProfile, onPayment, onPaymentSuccess } from "../controller/profile";

const router = express.Router();

router.get("/", getProfile);

router.post("/payment", onPayment);

router.post("/payment/success", onPaymentSuccess);

export default router;
