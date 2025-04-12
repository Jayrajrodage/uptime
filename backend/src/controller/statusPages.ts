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
      where: { slug: `${slug}.uptime.com` },
    });

    if (existingPage) {
      return res.status(409).send({
        message: "Slug is already taken. Please choose a different one.",
      });
    }
    await prisma.statusPages.create({
      data: {
        title,
        slug: `${slug}.uptime.com`,
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
    const parsedData = PagesSchema.safeParse(req.body.data);
    const { id } = req.params;
    if (!parsedData.success) {
      const errorMessages = parsedData.error.issues.map(
        (obj) => `${obj.message}: ${obj.path[0]}`
      );
      res.status(400).send({ message: errorMessages });
      return;
    }
    const { title, slug, monitorId } = parsedData.data;
    await prisma.statusPages.update({
      where: { id: parseInt(id) },
      data: {
        title,
        slug,
        monitorId,
      },
    });
    res.status(201).send({
      message: "status page created successfully",
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
    //TODO: before delete check if the page is used on any monitor
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
