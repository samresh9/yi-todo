import * as dotenv from "dotenv";
import express from "express";
import type { Express } from "express";
import prisma from "../DB/dbConfig";
import userRoutes from "./routes/userRoutes";
dotenv.config();
const app: Express = express();
const port = parseInt(process.env.PORT ?? "7000");
console.log(process.env.JWT_SECRET);
app.use(express.json());

// test
// app.post("/tasks", async (req: Request, res: Response) => {
//   try {
//     const { title, description, completed } = req.body;
//     const isCompleted = completed === "true";
//     const data: Task = {
//       title,
//       description,
//       completed: isCompleted,
//     };
//     // Create a new task using Prisma Client
//     const newTask = await prisma.task.create({
//       data,
//     });
//     res
//       .status(203)
//       .json({ message: "Task created successfully", task: newTask });
//   } catch (error) {
//     console.error("Error creating task:", error);
//     res.status(500).json({ error: "Failed to create task" });
//   }
// });
// app.get("/", (req, res) => {
//   res.send("hi");
// });
app.use("/user", userRoutes);

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
