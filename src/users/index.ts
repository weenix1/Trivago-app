import express from "express";
import UserModel, { Iuser } from "./schema";
import { Request, Response, NextFunction } from "express";
import { JWTAuthenticate } from "../auth/tools";
import { JWTAuthMiddleware } from "../auth/token";
import { adminOnlyMiddleware } from "../auth/admin";

import createHttpError = require("http-errors");

declare global {
  namespace Express {
    interface Request {
      user?: Iuser;
    }
  }
}

interface credentials{
  email:string
  password:string
}

const usersRouter = express.Router();

usersRouter.post(
  "/register",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const newUser = new UserModel(req.body);
      const { _id } = await newUser.save();
      res.send({ _id });
    } catch (error) {
      next(error);
    }
  }
);

usersRouter.get(
  "/",
  JWTAuthMiddleware,
  adminOnlyMiddleware,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const users = await UserModel.find();
      res.send(users);
    } catch (error) {
      next(error);
    }
  }
);

usersRouter.get(
  "/me",
  JWTAuthMiddleware,

  async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.send(req.user);
    } catch (error) {
      next(error);
    }
  }
);

usersRouter.get(
  "/:id",
  JWTAuthMiddleware,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await UserModel.findById(req.params.id);
      res.send(user);
    } catch (error) {
      next(error);
    }
  }
);

usersRouter.put(
  "/:id",
  JWTAuthMiddleware,
  adminOnlyMiddleware,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
    } catch (error) {
      next(error);
    }
  }
);


usersRouter.post(
  "/login",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // 1. Get credentials from req.body
      const { email, password } = req.body;

      // 2. Verify credentials
      const user = await UserModel.checkCredentials(email, password)

      if (user) {
        // 3. If credentials are fine we are going to generate an access token
        const { accessToken } = await JWTAuthenticate(user);
        res.send({ accessToken });
      } else {
        // 4. If they are not --> error (401)
        next(createHttpError(401, "Credentials not ok!"));
      }
    } catch (error) {
      next(error);
    }
  }
/* usersRouter.delete(
  "/me",
  JWTAuthMiddleware,
  async (req: Request, res: Response, next: NextFunction) => {
    const me = req.user._id.toString();

    try {
      const deletedUser = await UserModel.findByIdAndDelete(me);
      if (deletedUser) {
        res.send(deletedUser);
      } else {
        next(createHttpError(404, `User with id ${me} not found!`));
      }
    } catch (error) {
      next(error);
    }
  }
);
usersRouter.delete("/me", JWTAuthMiddleware, async (req, res, next) => {
  const me = req.user._id.toString();

  try {
    const deletedUser = await UserModel.findByIdAndDelete(me);
    if (deletedUser) {
      res.send(deletedUser);
    } else {
      next(createHttpError(404, `User with id ${me} not found!`));
    }
  } catch (error) {
    next(error);
  }
});

usersRouter.delete(
  "/:id",
  JWTAuthMiddleware,
  adminOnlyMiddleware,
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.user._id.toString();

    try {
      const deletedUser = await UserModel.findByIdAndDelete(id);
      if (deletedUser) {
        res.send(deletedUser);
      } else {
        next(createHttpError(404, `User with id ${id} not found!`));
      }
    } catch (error) {
      next(error);
    }
  }
);


); */

export default usersRouter;
