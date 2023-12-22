import prisma from "../../DB/dbConfig";
import type { User } from "../../DB/dbConfig";
import { StatusCodes } from "http-status-codes";
import type { Request, Response } from "express";
import bcrypt from "bcrypt";
import { setUser } from "../utils/authJwt";
const saltRounds = 10;

interface ReqBody {
  email: string;
  password: string;
}
async function handleUserRegister(req: Request, res: Response): Promise<void> {
  try {
    const { email, password }: ReqBody = req.body;
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
    const newUser = await prisma.user.create({
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

async function handleUserLogin(req: Request, res: Response): Promise<void> {
  try {
    const { email, password }: ReqBody = req.body;
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
        .status(StatusCodes.UNAUTHORIZED)
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
