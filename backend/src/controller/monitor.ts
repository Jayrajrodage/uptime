import prisma from "../utils/db";
import nodemailer from "nodemailer";
import { Request, Response } from "express";
import { MonitorAlertSchema, MonitorSchema } from "../zod/schema";
import dotenv from "dotenv";
import axios, { AxiosError } from "axios";
dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "malaktel85@gmail.com",
    pass: process.env.GMAIL_API,
  },
});

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
            },
          },
          subRegions: {
            select: {
              id: true,
            },
          },
          StatusPages: {
            select: {
              title: true,
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

    try {
      await axios.get(parsedData.data.url);
    } catch (error: any) {
      res.status(400).send({
        message: error?.message,
      });
      return;
    }
    const existingMonitor = await prisma.monitors.count({
      where: { clerkId, isDeleted: false },
    });
    if (existingMonitor >= 2) {
      res.status(403).send({
        message: "Maximum limit 2 monitors",
      });
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
    try {
      await axios.get(parsedData.data.url);
    } catch (error: any) {
      res.status(400).send({
        message: "Monitor is unreachable",
      });
      return;
    }
    await prisma.monitors.update({
      where: { id: parseInt(id) },
      data: {
        name,
        url,
        headers,
        frequency,
        subRegions: {
          set: subRegions.map((id) => ({ id })),
        },
        timeout,
        notificationChannel: {
          set: notificationChannel.map((id) => ({ id })),
        },
        StatusPages: StatusPages
          ? { connect: { id: StatusPages } }
          : { disconnect: true },
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
      key,
      url,
      subRegions,
      statusCode,
      message,
      timeStamp,
      monitorId,
      region,
    } = parsedData.data;
    if (key !== process.env.EmailAuth) {
      res.status(401).send({ message: "Unauthorized: auth key not found" });
      return;
    }
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

    const mailOptions = {
      from: `uptime <malaktel85@gmail.com>`,
      to: emailIds,
      subject: `🚨 Alert for Monitor: ${monitor.name}`,
      html: `
        <div>
          <h2>Monitor Alert Triggered</h2>
          <p><strong>Name:</strong> ${monitor.name}</p>
          <p><strong>URL:</strong> ${url}</p>
          <p><strong>Status Code:</strong> ${statusCode}</p>
          <p><strong>Message:</strong> ${message}</p>
          <p><strong>Regions:</strong> ${region}</p>
          <p><strong>Sub Regions:</strong> ${subRegions}</p>
          <p><strong>Time:</strong> ${new Date(timeStamp)}</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

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

export const getMonitorInfo = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const Monitor = await prisma.monitors.findFirst({
      where: { id: parseInt(id), isDeleted: false },
      select: {
        name: true,
        url: true,
        frequency: true,
        notificationChannel: true,
        subRegions: true,
        isActive: true,
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
    console.log("🚀 ~ getMonitorInfo ~ error:", error);
    res.status(500).send({
      message: "error while getting monitor info",
      error,
    });
  }
};
