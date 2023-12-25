import express from "express";
import {
  handleUserLogin,
  handleUserRegister,
} from "../controllers/userController";
import { validate } from "../middlewares/validationMiddleware";
import { userSchema } from "../utils/validationSchema";
const router = express.Router();

router.post("/register", validate(userSchema), handleUserRegister);
router.post("/login", validate(userSchema), handleUserLogin);

export default router;
