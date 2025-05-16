import z from "zod";

export const chartGeneratorResponse = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
});
