import prisma from "../utils/db";
import { Request, Response } from "express";
export const getProfile = async (req: Request, res: Response) => {
  try {
    const userId = req.auth?.userId;
    if (!userId) {
      res.status(500).send({
        success: true,
        message: "Id not found",
      });
      return;
    }
    const Profile = await prisma.user.findFirst({ where: { clerkId: userId } });
    if (!Profile) {
      res.status(404).send({
        success: false,
        message: "Profile Not Found",
      });
      return;
    }

    res.status(200).send({
      success: true,
      message: "Profile Found",
      Profile,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while getting user's profile",
      error,
    });
  }
};
