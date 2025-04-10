import Stripe from "stripe";
import prisma from "../utils/db";
import { Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();
export const getProfile = async (req: Request, res: Response) => {
  try {
    const userId = req.userId;
    if (!userId) {
      res.status(500).send({
        message: "Id not found",
      });
      return;
    }
    const Profile = await prisma.user.findFirst({ where: { clerkId: userId } });
    if (!Profile) {
      res.status(404).send({
        message: "Profile Not Found",
      });
      return;
    }
    res.status(200).send({
      message: "Profile Found",
      Profile,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error while getting user's profile",
      error,
    });
  }
};

export const onPayment = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const stripe = new Stripe(process.env.STRIPE_SECRET!, {
      typescript: true,
      apiVersion: "2025-03-31.basil",
    });
    const session = await stripe.checkout.sessions.create({
      billing_address_collection: "auto",
      line_items: [
        {
          price: data.priceId,
          quantity: 1,
        },
      ],
      mode: "subscription",
      success_url: `${process.env.FRONTEND_URL}/dashboard/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL}/dashboard/settings/billing`,
    });
    res.status(200).send({
      message: "Payment Created",
      Url: session.url,
    });
  } catch (error) {
    console.log("🚀 ~ onPayment ~ error:", error);
    res.status(500).send({
      message: "Error on payment",
      error,
    });
  }
};

export const onPaymentSuccess = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const userId = req.userId;
    const stripe = new Stripe(process.env.STRIPE_SECRET!, {
      typescript: true,
      apiVersion: "2025-03-31.basil",
    });
    const session = await stripe.checkout.sessions.listLineItems(
      data.sessionId
    );
    if (!session.data[0].description) return;
    await prisma.user.update({
      where: { clerkId: userId },
      data: {
        plan:
          session.data[0].description === "Unlimited"
            ? "UNLIMITED"
            : session.data[0].description === "Pro"
            ? "PRO"
            : "FREE",
      },
    });
    res.status(200).send({ message: "payment success" });
  } catch (error) {
    console.log("🚀 ~ onPaymentSuccess ~ error:", error);
    res.status(500).send({
      message: "Error on payment success",
      error,
    });
  }
};
