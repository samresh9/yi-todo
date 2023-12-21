import prisma from "../../DB/dbConfig";
import type { Request, Response } from "express";
import { setUser } from "../utils/authJwt";
async function handleUserRegister(req: Request, res: Response): Promise<void> {
  try {
    const { email, password } = req.body;
    const user: object | null = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (user != null) {
      res.json({ emailExist: true, data: { existingUser: user } });
      return;
    }
    const newUser = await prisma.user.create({
      data: {
        email,
        password,
      },
    });
    res.json({ emailExist: false, data: { newUser } });
  } catch (err) {}
}

async function handleUserLogin(req: Request, res: Response): Promise<void> {
  try {
    const { email, password } = req.body;
    const user = await prisma.user.findFirst({
      where: {
        email,
      },
    });
    if (user == null) {
      res.json({ user: false });
      return;
    }
    if (user.password !== password) {
      res.json({ password: false });
      return;
    }
    const token = await setUser(user);
    res.json({ token });
  } catch (e) {}
}

export { handleUserLogin, handleUserRegister };
