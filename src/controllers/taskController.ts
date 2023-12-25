import prisma from "../../DB/dbConfig";
import { StatusCodes } from "http-status-codes";
import type { z } from "zod";
import type { Request, Response } from "express";
import type { taskSchema } from "../utils/validationSchema";

type TaskData = z.infer<typeof taskSchema>;
async function handleCreateNewTask(
  req: Request<unknown, unknown, TaskData>, // Request<ParamsType, QueryType, BodyType>
  res: Response,
): Promise<void> {
  console.log(res.locals.user);
  try {
    const { title, description, completed } = req.body;
    const { id } = res.locals.user;
    const newTask = await prisma.task.create({
      data: {
        user_id: id,
        title,
        description,
        completed,
      },
    });
    console.log(newTask);
    res.status(StatusCodes.CREATED).json({ success: true, data: newTask });
  } catch (err) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ success: false, error: "Internal Server Error" });
  }
}
async function handleGetAllTask(req: Request, res: Response): Promise<void> {
  try {
    const { id } = res.locals.user;
    const allTask = await prisma.user.findFirst({
      where: {
        id,
      },
      include: {
        tasks: true,
      },
    });
    res.json({ success: true, data: allTask });
  } catch (err) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ success: false, error: "Internal Server Error" });
  }
}
async function handleUpdateTask(req: Request, res: Response): Promise<void> {
  try {
    const { id } = res.locals.user;
    const { taskId, title, description, completed } = req.body;
    console.log(taskId);
    const allTask = await prisma.task.update({
      where: {
        id: taskId,
        user_id: id,
      },
      data: {
        title,
        description,
        completed,
      },
    });
    console.log(allTask);
    res.json({ success: true, data: allTask });
  } catch (err) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ success: false, error: "Internal Server Error" });
  }
}

async function handleDeleteTask(req: Request, res: Response): Promise<void> {
  try {
    const { taskId } = req.body;
    const deleteTask = await prisma.task.delete({
      where: {
        id: taskId,
      },
      select: {
        id: true,
      },
    });
    res.json({ success: true, data: deleteTask });
  } catch (err) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ success: false, error: "Internal Server Error" });
  }
}
export {
  handleCreateNewTask,
  handleGetAllTask,
  handleUpdateTask,
  handleDeleteTask,
};
