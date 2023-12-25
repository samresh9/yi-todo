import express from "express";
import {
  handleCreateNewTask,
  handleGetAllTask,
  handleUpdateTask,
  handleDeleteTask,
} from "../controllers/taskController";
import { validate } from "../middlewares/validationMiddleware";
import {
  taskCreateSchema,
  taskUpdateSchema,
  taskDeleteSchema,
} from "../utils/validationSchema";
const router = express.Router();

router.post("/", validate(taskCreateSchema), handleCreateNewTask);
router.get("/", handleGetAllTask);
router.put("/", validate(taskUpdateSchema), handleUpdateTask);
router.delete("/", validate(taskDeleteSchema), handleDeleteTask);

export default router;
