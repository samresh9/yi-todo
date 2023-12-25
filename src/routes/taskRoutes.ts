import express from "express";
import {
  handleCreateNewTask,
  handleGetAllTask,
  handleUpdateTask,
  handleDeleteTask,
} from "../controllers/taskController";
import { checkAuthentication } from "../middlewares/authMiddleware";
import { validate } from "../middlewares/validationMiddleware";
import { taskSchema } from "../utils/validationSchema";
const router = express.Router();

router.post(
  "/",
  checkAuthentication,
  validate(taskSchema),
  handleCreateNewTask,
);
router.get("/", checkAuthentication, handleGetAllTask);
router.put("/", checkAuthentication, handleUpdateTask);
router.delete("/", checkAuthentication, handleDeleteTask);
export default router;
