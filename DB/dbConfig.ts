import { PrismaClient } from "@prisma/client";
import type { Task } from "@prisma/client";

const prisma = new PrismaClient();

export type { Task };
export default prisma;
