import { Request, Response, NextFunction } from "express";
export const auth = (req: Request, res: Response, next: NextFunction) => {
  //ignore auth for this route
  if (
    req.originalUrl.startsWith("/api/status-pages/data/") ||
    req.originalUrl.startsWith("/api/profile/create")
  ) {
    return next();
  }
  const { userId } = req.auth;
  if (!userId) {
    res.status(401).json({
      success: false,
      message: "Unauthorized: userId not found",
    });
    return;
  }
  req.userId = userId;
  next();
};
