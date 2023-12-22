import { getUser } from "../utils/authJwt";
import type { Request, Response, NextFunction } from "express";
async function checkAuthentication(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  const authHeaderValue = req.headers.authorization;

  if (authHeaderValue == null) {
    next();
    return;
  }
  const token: string = authHeaderValue.split(" ")[1];
  const user = await getUser(token);
  res.locals.user = user;
  next();
}

export { checkAuthentication };
