import { z } from "zod";

export const CreateTaskSchema = z.object({
  title: z.string().min(1).max(255),
  description: z.string().max(1000),
});

export type CreateTaskDto = z.infer<typeof CreateTaskSchema>;