import createHttpError from "http-errors";
import jwt from "jsonwebtoken";
import UserModel from "../users/schema";
import { Iuser } from "../users/schema";
import { Request, Response, NextFunction } from "express";

export const jwtSecret = process.env.JWT_SECRET!;

export const JWTAuthenticate = async (user: Iuser) => {
  // 1. given the user generates tokens (access and refresh)
  const accessToken = await generateJWTToken({ _id: user._id });
  /* const refreshToken = await generateRefreshToken({ _id: user._id }); */

  // 2. refresh token should be saved in db
  /* user.refreshToken = refreshToken; */
  /* await user.save(); */

  // 3. return both the tokens
  return { accessToken /*  refreshToken  */ };
};

const generateJWTToken = (payload: string | object) =>
  new Promise((resolve, reject) =>
    jwt.sign(payload, jwtSecret, { expiresIn: "15m" }, (err, token) => {
      if (err) reject(err);
      else resolve(token);
    })
  );

/* const generateRefreshToken = (payload) =>
  new Promise((resolve, reject) =>
    jwt.sign(
      payload,
      process.env.JWT_REFRESH_SECRET:Isecret,
      { expiresIn: "1 week" },
      (err, token) => {
        if (err) reject(err);
        else resolve(token);
      }
    )
  ); */

export const verifyJWT = (token: string) =>
  new Promise((res, rej) =>
    jwt.verify(token, jwtSecret, (err: any, decodedToken: string | any) => {
      if (err) rej(err);
      else res(decodedToken);
    })
  );

/* const verifyRefreshToken = (token: string) =>
  new Promise((res, rej) =>
    jwt.verify(token, jwtSecret, (err: any, decodedToken: string | any) => {
      if (err) rej(err);
      else res(decodedToken);
    })
  );

// generateJWTToken({ _id: "oasjidoasjdosaij" })
//   .then(token => console.log(token))
//   .catch(err => console.log(err))

// const token = await generateJWTToken({})

// const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "15m" })

 export const verifyRefreshAndGenerateTokens = async (
  currentRefreshToken: any
) => {
  // 1. check the validity of current refresh token (exp date and integrity)
  const decodedRefreshToken = await verifyRefreshToken(currentRefreshToken);

  // 2. if token is valid we are going to check if it is the same in our db
  const user = await UserModel.findById(decodedRefreshToken._id);

  if (!user) throw new createHttpError(404, "User not found!");

  if (user.refreshToken && user.refreshToken === currentRefreshToken) {
    // 3. if everything is fine we are going to generate a new pair of tokens
    const { accessToken, refreshToken } = await JWTAuthenticate(user);

    // 4. return tokens
    return { accessToken, refreshToken };
  } else {
    throw new createHttpError(401, "Token not valid!");
  }
}; 
 */

function ProcessEnv(
  payload: string | object,
  jwtSecret: string | undefined,
  ProcessEnv: any,
  arg3: { expiresIn: string },
  arg4: (err: any, token: any) => void
): void {
  throw new Error("Function not implemented.");
}
