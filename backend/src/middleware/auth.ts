import { Request, Response, NextFunction } from "express";
import { jwtDecode } from "jwt-decode";

export const auth = (req: Request, res: Response, next: NextFunction) => {
  //ignore auth for this route
  if (
    req.originalUrl.startsWith("/api/status-pages/data/") ||
    req.originalUrl.startsWith("/api/profile/create")
  ) {
    return next();
  }
  const token = req.cookies.__session;
  if (!token) {
    res.status(401).json({
      success: false,
      message: "Unauthorized: token not found",
    });
    return;
  }
  const decodedToken = jwtDecode<{ exp: number; sub: string }>(token);
  const userId = decodedToken.sub;
  if (!userId) {
    res.status(401).json({
      success: false,
      message: "Unauthorized: userId not found",
    });
    return;
  }
  req.userId = decodedToken.sub;
  next();
};
