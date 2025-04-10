import prisma from "../utils/db";
import { Request, Response } from "express";
import { channelSchema, updateChannelSchema } from "../zod/schema";
import { fromError } from "zod-validation-error";

export const createChannel = async (req: Request, res: Response) => {
  try {
    const parsedData = channelSchema.safeParse(req.body);
    const clerkId = req.userId;
    if (!parsedData.success) {
      const errorMessages = parsedData.error.issues.map((obj) => obj.message);
      res.status(400).send({ message: errorMessages });
      return;
    }
    const { name, channel, channeldata } = parsedData.data;
    await prisma.notificationChannels.create({
      data: { name, channel, clerkId, channeldata },
    });
    res.status(201).send({
      message: "Channel created successfully",
    });
  } catch (error) {
    console.log("🚀 ~ createChannel ~ error:", error);
    res.status(500).send({
      message: "error while creating channel",
      error,
    });
  }
};

export const getChannels = async (req: Request, res: Response) => {
  try {
    const clerkId = req.userId;
    const Channels = await prisma.notificationChannels.findMany({
      where: { clerkId: clerkId },
      include: {
        monitors: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
    if (Channels.length < 0) {
      res.status(401).send({
        message: "Channels not found",
      });
      return;
    }
    res.status(200).send({
      message: "Channels found successfully",
      Channels,
    });
  } catch (error) {
    console.log("🚀 ~ getChannels ~ error:", error);
    res.status(500).send({
      message: "error while getting channel",
      error,
    });
  }
};

export const getChannelDetails = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const Channel = await prisma.notificationChannels.findFirst({
      where: { id: parseInt(id) },
      include: {
        monitors: {
          select: {
            id: true,
            name: true,
            url: true,
          },
        },
      },
    });
    if (!Channel) {
      res.status(401).send({
        message: "Channels not found",
      });
      return;
    }
    res.status(200).send({
      message: "Channel found successfully",
      Channel,
    });
  } catch (error) {
    console.log("🚀 ~ getChannelDetails ~ error:", error);
    res.status(500).send({
      message: "error while getting channel details",
      error,
    });
  }
};

export const updateChannel = async (req: Request, res: Response) => {
  try {
    const parsedData = updateChannelSchema.safeParse(req.body.data);
    const { id } = req.params;
    if (!parsedData.success) {
      const errorMessages = parsedData.error.issues.map(
        (obj) => `${obj.message}: ${obj.path[0]}`
      );
      res.status(400).send({ message: errorMessages });
      return;
    }
    const { name, channel, channeldata, monitors } = parsedData.data;
    await prisma.notificationChannels.update({
      where: { id: parseInt(id) },
      data: {
        name,
        channel,
        channeldata,
        monitors: {
          set: monitors.map((monitorId) => ({ id: monitorId })),
        },
      },
    });
    res.status(201).send({
      message: "Channel created successfully",
    });
  } catch (error) {
    console.log("🚀 ~ updateChannel ~ error:", error);
    res.status(500).send({
      message: "error while updating channel",
      error,
    });
  }
};

export const deleteChannel = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.notificationChannels.delete({ where: { id: parseInt(id) } });
    res.status(200).send({
      message: "Channel deleted successfully",
    });
  } catch (error) {
    console.log("🚀 ~ deleteChannel ~ error:", error);
    res.status(500).send({
      message: "error while deleting channel",
      error,
    });
  }
};
