import prisma from "../utils/db";
import { Request, Response } from "express";
import { channelSchema } from "../zod/schema";

export const createChannel = async (req: Request, res: Response) => {
  try {
    const body = channelSchema.safeParse(req.body);
    const clerkId = req.userId;
    if (!body.success) {
      const errorMessages = body.error.issues.map((obj) => obj.message);
      res.status(400).send({ ZodError: true, message: errorMessages });
      return;
    }
    const { name, channel, channeldata } = body.data;
    await prisma.notificationChannels.create({
      data: { name, channel, clerkId, channeldata },
    });
    res.status(201).send({
      success: true,
      message: "Channel created successfully",
    });
  } catch (error) {
    console.log("🚀 ~ createChannel ~ error:", error);
    res.status(500).send({
      success: false,
      message: "error while creating channel",
      error,
    });
  }
};
