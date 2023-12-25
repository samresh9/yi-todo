import { z } from "zod";

const userSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

const taskCreateSchema = z.object({
  title: z.string(),
  description: z.string().nullish(),
  completed: z.boolean().optional(),
});

const taskUpdateSchema = taskCreateSchema.extend({
  title: z.string().optional(),
  taskId: z.number(),
});
const taskDeleteSchema = taskUpdateSchema.pick({ taskId: true });
export { userSchema, taskCreateSchema, taskUpdateSchema, taskDeleteSchema };
