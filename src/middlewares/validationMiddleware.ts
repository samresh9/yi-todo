import { z, type AnyZodObject } from "zod";
import type { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";

const validate = (schema: AnyZodObject) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (err) {
      if (err instanceof z.ZodError) {
        console.log(err.format());
        const errMessage = err.issues.map((err) => ({
          path: err.path.join(""),
          message: err.message,
        }));
        return res.status(StatusCodes.BAD_REQUEST).json({ error: errMessage });
      }
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: "Internal Server Error" });
    }
  };
};

export { validate };
