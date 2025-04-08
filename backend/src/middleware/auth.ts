import { Request, Response, NextFunction } from "express";

export const auth = (req: Request, res: Response, next: NextFunction) => {
  const authenticated = req.auth?.sessionClaims;
  if (!authenticated) {
    res.status(401).json({
      success: false,
      message: "Unauthorized: token not found",
    });
    return;
  }
  const nowInSeconds = Math.floor(Date.now() / 1000);
  if (authenticated.exp < nowInSeconds) {
    res.status(401).json({
      success: false,
      message: "Session expired",
    });
    return;
  }
  const userId = req.auth?.userId;
  console.log("🚀 ~ auth ~ userId:", userId);
  if (!userId) {
    res.status(401).json({
      success: false,
      message: "Unauthorized: userId not found",
    });
    return;
  }
  next();
};
