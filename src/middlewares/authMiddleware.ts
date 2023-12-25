import { getUser } from "../utils/authJwt";
import type { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
async function checkAuthentication(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  const authHeaderValue = req.headers.authorization;
  console.log("in auth");
  if (authHeaderValue == null) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: "Unauthorized: Invalid token or user not found" });
    return;
  }
  const token: string = authHeaderValue.split(" ")[1];
  const user = await getUser(token);
  if (user === null) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: "Unauthorized: Invalid token or user not found" });
    return;
  }
  res.locals.user = user;
  next();
}

export { checkAuthentication };
