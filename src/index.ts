import "dotenv/config";
import express from "express";
import type { Express } from "express";
import prisma from "../DB/dbConfig";
import userRoutes from "./routes/userRoutes";
import taskRoutes from "./routes/taskRoutes";
import { checkAuthentication } from "../src/middlewares/authMiddleware";
// dotenv.config();
const app: Express = express();
const port = parseInt(process.env.PORT ?? "7000");

app.use(express.json());
app.use("/user", userRoutes);
app.use("/task", checkAuthentication, taskRoutes);

prisma
  .$connect()
  .then(() => {
    console.log("Connected to SQL Database");
    app.listen(port, () => {
      console.log(`Listening to port ${port}`);
    });
  })
  .catch((e) => {
    console.log(e.message, "Database Connection Error");
  });
