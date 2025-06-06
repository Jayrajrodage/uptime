import axios from "axios";
import prisma from "../utils/db";
import { Request, Response } from "express";
import { PagesSchema } from "../zod/schema";
export const getPages = async (req: Request, res: Response) => {
  try {
    const clerkId = req.userId;
    const Pages = await prisma.statusPages.findMany({
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
    if (!Pages) {
      res.status(401).send({
        message: "Pages not found",
      });
      return;
    }
    res.status(200).send({
      message: "Pages found successfully",
      Pages,
    });
  } catch (error) {
    console.log("🚀 ~ getPages ~ error:", error);
    res.status(500).send({
      message: "error while getting pages",
      error,
    });
  }
};

export const createPage = async (req: Request, res: Response) => {
  try {
    const parsedData = PagesSchema.safeParse(req.body.inputData);
    const clerkId = req.userId;
    if (!parsedData.success) {
      const errorMessages = parsedData.error.issues.map(
        (obj) => `${obj.message}: ${obj.path[0]}`
      );
      res.status(400).send({ message: errorMessages });
      return;
    }

    const { title, slug, monitorId } = parsedData.data;

    const existingPage = await prisma.statusPages.findUnique({
      where: { slug: `${slug}.uptimely.top` },
    });

    if (existingPage) {
      res.status(409).send({
        message: "Slug is already taken. Please choose a different one.",
      });
      return;
    }
    await prisma.statusPages.create({
      data: {
        title,
        slug: `${slug}.uptimely.top`,
        clerkId,
        ...(monitorId && {
          monitorId: monitorId,
        }),
      },
    });
    res.status(201).send({
      message: "Status Page created successfully",
    });
  } catch (error) {
    console.log("🚀 ~ createPage ~ error:", error);
    res.status(500).send({
      message: "error while creating page",
      error,
    });
  }
};

export const updatePage = async (req: Request, res: Response) => {
  try {
    const parsedData = PagesSchema.safeParse(req.body);
    const { id } = req.params;
    if (!parsedData.success) {
      const errorMessages = parsedData.error.issues.map(
        (obj) => `${obj.message}: ${obj.path[0]}`
      );
      res.status(400).send({ message: errorMessages });
      return;
    }
    const { title, slug, monitorId } = parsedData.data;
    const existingPage = await prisma.statusPages.findUnique({
      where: { slug: `${slug}.uptimely.top` },
    });

    if (existingPage && existingPage.id !== parseInt(id)) {
      res.status(409).send({
        message: "Slug is already taken. Please choose a different one.",
      });
      return;
    }
    await prisma.statusPages.update({
      where: { id: parseInt(id) },
      data: {
        title,
        slug: `${slug}.uptimely.top`,
        monitorId: monitorId,
      },
    });
    res.status(201).send({
      message: "status page updated successfully",
    });
  } catch (error) {
    console.log("🚀 ~ updatePage ~ error:", error);
    res.status(500).send({
      message: "error while updating status page",
      error,
    });
  }
};

export const getPageDetails = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const Page = await prisma.statusPages.findFirst({
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
    if (!Page) {
      res.status(401).send({
        message: "status page not found",
      });
      return;
    }
    res.status(200).send({
      message: "status page found successfully",
      Page,
    });
  } catch (error) {
    console.log("🚀 ~ getPageDetails ~ error:", error);
    res.status(500).send({
      message: "error while getting page details",
      error,
    });
  }
};

export const deletePage = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const statusPage = await prisma.statusPages.findUnique({
      where: { id: parseInt(id) },
      include: {
        monitors: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    if (!statusPage) {
      res.status(404).send({ message: "Status page not found" });
      return;
    }

    if (statusPage.monitorId) {
      res.status(400).send({
        message: `Remove/unlink this status from ${statusPage.monitors?.name} monitor.`,
      });
      return;
    }
    await prisma.statusPages.delete({ where: { id: parseInt(id) } });
    res.status(200).send({
      message: "status page deleted successfully",
    });
  } catch (error) {
    console.log("🚀 ~ deletePage ~ error:", error);
    res.status(500).send({
      message: "error while deleting status page",
      error,
    });
  }
};

export const getPageStats = async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;
    const page = await prisma.statusPages.findUnique({
      where: { slug: `${slug}.uptimely.top` },
      include: { monitors: true },
    });

    if (!page) {
      res.status(409).send({
        message: "Slug not found.",
      });
      return;
    }
    if (!page.monitorId) {
      res.status(200).send({
        message: "status page found successfully",
        data: { page: page },
      });
      return;
    }
    const response = await axios.get(
      `https://api.us-east.aws.tinybird.co/v0/pipes/last_45d.json?monitor_id=${page.monitorId}`,
      { headers: { Authorization: `Bearer ${process.env.TINYBIRD_KEY}` } }
    );
    if (!response.data?.data) {
      res.status(200).send({
        message: "status page found successfully",
        data: { page: page },
      });
      return;
    }
    const data = response.data?.data[0];
    if (data?.dayWiseStats && Array.isArray(data.dayWiseStats)) {
      const missing = 45 - data.dayWiseStats.length;
      if (missing > 0) {
        const emptyItems = Array(missing).fill({
          date: "",
          totalFailed: "0",
          totalSuccess: "0",
        });
        data.dayWiseStats = data.dayWiseStats.concat(emptyItems);
      }
    }
    res.status(200).send({
      message: "status page found with stats successfully",
      data: { page, ...data },
    });
  } catch (error) {
    console.log("🚀 ~ getPageStats ~ error:", error);
  }
};
