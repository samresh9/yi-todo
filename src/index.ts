import express from "express";
import type { Express, Request, Response } from "express";
import prisma from "../DB/dbConfig";
const app: Express = express();
const port = parseInt(process.env.PORT ?? "3000");

app.post("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
