import Stripe from "stripe";
import prisma from "../utils/db";
import { Request, Response } from "express";
import dotenv from "dotenv";
import { Webhook } from "svix";
import { WebhookEvent } from "@clerk/express";
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

export const createProfile = async (req: Request, res: Response) => {
  try {
    const SIGNING_SECRET = process.env.CLERK_WH_SIGNING_SECRET;

    if (!SIGNING_SECRET) {
      throw new Error(
        "Error: Please add SIGNING_SECRET from Clerk Dashboard to .env"
      );
    }
    const svix_id = req.get("svix-id");
    const svix_timestamp = req.get("svix-timestamp");
    const svix_signature = req.get("svix-signature");

    if (!svix_id || !svix_timestamp || !svix_signature) {
      res.status(400).send({ message: "Error: Missing Svix headers" });
      return;
    }

    const payload = await req.body;
    const body = JSON.stringify(payload);

    const wh = new Webhook(SIGNING_SECRET);
    // Verify payload with headers
    const evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;

    if (evt.type !== "user.created") {
      throw new Error("Error:Webhook event is not user.created");
    }
    const { id } = evt.data;
    await prisma.user.create({
      data: {
        clerkId: id,
      },
    });
    res.status(201).json({ message: "Received" });
  } catch (error) {
    console.log("🚀 ~ createProfile ~ error:", error);
    res.status(500).send({
      message: "Error while creating profile",
      error,
    });
  }
};
