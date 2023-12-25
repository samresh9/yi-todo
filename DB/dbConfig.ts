import { PrismaClient } from "@prisma/client";
import type { Task, User } from "@prisma/client";

const prisma = new PrismaClient();

export type { Task, User };
export default prisma;
