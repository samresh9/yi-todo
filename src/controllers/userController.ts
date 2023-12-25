import prisma from "../../DB/dbConfig";
import { StatusCodes } from "http-status-codes";
import type { Request, Response } from "express";
import type { User } from "../../DB/dbConfig";
import type { z } from "zod";
import type { userSchema } from "../utils/validationSchema";
import bcrypt from "bcrypt";
import { setUser } from "../utils/authJwt";
const saltRounds = 10;

type UserData = z.infer<typeof userSchema>;
async function handleUserRegister(req: Request, res: Response): Promise<void> {
  try {
    const { email, password }: UserData = req.body;
    const user: User | null = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (user != null) {
      res.status(StatusCodes.CONFLICT).json({
        success: false,
        emailExist: true,
        data: { existingUser: user },
      });
      return;
    }
    const passwordHash = await bcrypt.hash(password, saltRounds);
    const newUser: User = await prisma.user.create({
      data: {
        email,
        password: passwordHash,
      },
    });
    res
      .status(StatusCodes.CREATED)
      .json({ success: true, emailExist: false, data: { newUser } });
  } catch (err) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ success: false, error: "Internal Server Error" });
  }
}

async function handleUserLogin(
  req: Request<unknown, unknown, UserData>,
  res: Response,
): Promise<void> {
  try {
    const { email, password } = req.body;
    const user = await prisma.user.findFirst({
      where: {
        email,
      },
    });
    if (user == null) {
      res
        .status(StatusCodes.NOT_FOUND)
        .json({ success: false, error: "User Not found" });
      return;
    }
    const result = await bcrypt.compare(password, user.password);
    if (result === !true) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ success: false, error: "Incorrect password" });
      return;
    }
    const token = await setUser(user);
    res.status(StatusCodes.OK).json({ success: true, data: { token } });
  } catch (err) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ success: false, error: "Internal Server Error" });
  }
}

export { handleUserLogin, handleUserRegister };
