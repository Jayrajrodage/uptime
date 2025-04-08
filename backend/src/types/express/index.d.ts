import { AuthObject } from "@clerk/express"; // or your actual auth type

declare global {
  namespace Express {
    interface Request {
      auth?: AuthObject;
    }
  }
}
