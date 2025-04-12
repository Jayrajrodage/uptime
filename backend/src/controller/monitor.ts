import prisma from "../utils/db";
import { Request, Response } from "express";
import { MonitorSchema } from "../zod/schema";
export const getMonitors = async (req: Request, res: Response) => {
  try {
    const clerkId = req.userId;

    // Get page and limit from query params (with default values)
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    const [Monitors, total] = await Promise.all([
      prisma.monitors.findMany({
        where: { clerkId, isDeleted: false },
        skip,
        take: limit,
        include: {
          notificationChannel: {
            select: {
              id: true,
              name: true,
              channel: true,
              channeldata: true,
            },
          },
          StatusPages: {
            select: {
              title: true,
              slug: true,
            },
          },
        },
      }),
      prisma.monitors.count({
        where: { clerkId, isDeleted: false },
      }),
    ]);

    res.status(200).send({
      message: "Monitors found successfully",
      Monitors,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.log("🚀 ~ getMonitors ~ error:", error);
    res.status(500).send({
      message: "Error while getting monitors",
      error,
    });
  }
};

export const createMonitor = async (req: Request, res: Response) => {
  try {
    const parsedData = MonitorSchema.safeParse(req.body.inputData);
    const clerkId = req.userId;
    if (!parsedData.success) {
      const errorMessages = parsedData.error.issues.map(
        (obj) => `${obj.message}: ${obj.path[0]}`
      );
      res.status(400).send({ message: errorMessages });
      return;
    }
    const {
      name,
      url,
      headers,
      frequency,
      subRegions,
      timeout,
      notificationChannel,
      StatusPages,
      isActive,
      method,
    } = parsedData.data;

    await prisma.monitors.create({
      data: {
        name,
        url,
        headers,
        frequency,
        subRegions: {
          connect: subRegions.map((id) => ({ id })),
        },
        timeout,
        notificationChannel: {
          connect: notificationChannel.map((id) => ({ id })),
        },
        ...(StatusPages && {
          StatusPages: {
            connect: { id: StatusPages },
          },
        }),
        clerkId,
        isActive,
        method,
      },
    });
    res.status(201).send({
      message: "Monitor created successfully",
    });
  } catch (error) {
    console.log("🚀 ~ createMonitor ~ error:", error);
    res.status(500).send({
      message: "Error while creating monitors",
      error,
    });
  }
};

export const getMonitorNames = async (req: Request, res: Response) => {
  try {
    const clerkId = req.userId;
    const Monitors = await prisma.monitors.findMany({
      where: { clerkId: clerkId },
      select: { id: true, name: true },
    });
    if (!Monitors) {
      res.status(401).send({
        message: "Monitors not found",
      });
      return;
    }
    res.status(200).send({
      message: "Monitors found successfully",
      Monitors,
    });
  } catch (error) {
    console.log("🚀 ~ getMonitorNames ~ error:", error);
    res.status(500).send({
      message: "error while getting monitor names",
      error,
    });
  }
};
