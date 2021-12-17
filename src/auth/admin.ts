import createHttpError from "http-errors";
import { Request, Response, NextFunction } from "express";
import { Iuser } from "../users/schema";

/* declare global {
  namespace Express {
    interface Request {
      user?: Iuser;
    }
  }
} */

export const adminOnlyMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.user!.role === "Host") {
    next();
  } else {
    next(createHttpError(403, "Host only!"));
  }
};
