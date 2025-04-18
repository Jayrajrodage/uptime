import prisma from "../utils/db";
import { Request, Response } from "express";
import { MonitorAlertSchema, MonitorSchema } from "../zod/schema";
import { Resend } from "resend";
import dotenv from "dotenv";
dotenv.config();

const resend = new Resend(process.env.RESEND_API_KEY);

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
      where: { clerkId: clerkId, isDeleted: false },
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

export const getMonitorDetails = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const Monitor = await prisma.monitors.findFirst({
      where: { id: parseInt(id), isDeleted: false },
      include: {
        subRegions: {
          select: {
            id: true,
            name: true,
          },
        },
        notificationChannel: {
          select: {
            id: true,
            name: true,
          },
        },
        StatusPages: {
          select: {
            id: true,
            title: true,
            slug: true,
          },
        },
      },
    });
    if (!Monitor) {
      res.status(401).send({
        message: "Monitor not found",
      });
      return;
    }
    res.status(200).send({
      message: "Monitor found successfully",
      Monitor,
    });
  } catch (error) {
    console.log("🚀 ~ getMonitorDetails ~ error:", error);
    res.status(500).send({
      message: "error while getting monitor",
      error,
    });
  }
};

export const updateMonitor = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const parsedData = MonitorSchema.safeParse(req.body.data);
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

    await prisma.monitors.update({
      where: { id: parseInt(id) },
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
        isActive,
        method,
      },
    });
    res.status(201).send({
      message: "Monitor updated successfully",
    });
  } catch (error) {
    console.log("🚀 ~ updateMonitor ~ error:", error);
    res.status(500).send({
      message: "Error while updating monitors",
      error,
    });
  }
};

export const deleteMonitor = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const monitorId = parseInt(id);

    // Check if monitor exists
    const monitor = await prisma.monitors.findUnique({
      where: { id: monitorId },
      include: {
        StatusPages: {
          select: {
            id: true,
          },
        },
        notificationChannel: {
          select: {
            id: true,
          },
        },
      },
    });

    if (!monitor) {
      res.status(404).send({ message: "Monitor not found" });
      return;
    }

    if (monitor.StatusPages) {
      res.status(400).send({
        message: "Cannot delete monitor linked to a status page",
      });
      return;
    }

    if (monitor.notificationChannel.length > 0) {
      res.status(400).send({
        message: "Cannot delete monitor linked to a notification channel",
      });
      return;
    }
    // Soft delete the monitor
    await prisma.monitors.update({
      where: { id: monitorId },
      data: {
        isDeleted: true,
        isActive: false,
      },
    });

    res.status(200).send({ message: "Monitor deleted successfully" });
  } catch (error) {
    console.error("🚀 ~ deleteMonitor ~ error:", error);
    res.status(500).send({
      message: "Error while deleting monitor",
      error,
    });
  }
};

export const createEmailAlert = async (req: Request, res: Response) => {
  try {
    const parsedData = MonitorAlertSchema.safeParse(req.body);
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
      subRegions,
      statusCode,
      message,
      timeStamp,
      monitorId,
      region,
    } = parsedData.data;

    const monitor = await prisma.monitors.findFirst({
      where: { id: monitorId },
      include: { notificationChannel: true },
    });
    if (!monitor) {
      res.status(400).send({ message: "Monitor not found" });
      return;
    }
    if (monitor.notificationChannel.length === 0) {
      res.status(400).send({ message: "Notification Channel not found" });
      return;
    }
    const emailIds = monitor.notificationChannel
      .filter((channel) => channel.channel === "Email")
      .map((channel) => channel.channeldata);

    await resend.emails.send({
      from: `${name} <onboarding@resend.dev>`,
      to: emailIds,
      subject: `🚨 Alert for Monitor: ${name}`,
      html: `
        <div>
          <h2>Monitor Alert Triggered</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>URL:</strong> ${url}</p>
          <p><strong>Status Code:</strong> ${statusCode}</p>
          <p><strong>Message:</strong> ${message}</p>
          <p><strong>Regions:</strong> ${region}</p>
          <p><strong>Sub Regions:</strong> ${subRegions}</p>
          <p><strong>Time:</strong> ${new Date(timeStamp)}</p>
        </div>
      `,
    });
    res.status(201).send({
      message: "Sent alert email",
    });
  } catch (error) {
    console.log("🚀 ~ createEmailAlert ~ error:", error);
    res.status(500).send({
      message: "Error while creating email alert",
      error,
    });
  }
};
