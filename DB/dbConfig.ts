import { PrismaClient } from "@prisma/client";
import type { Task, User } from "@prisma/client";

const prisma = new PrismaClient({
  log: ["query"],
});

export type { Task, User };
export default prisma;
