import { z } from "zod";

export const CreateProductSchema = z.object({
  name: z.string().min(1, "Name is required"),
  price: z.string().regex(/^\d+$/, "Price must be numeric"),
});

export type CreateProductInput = z.infer<typeof CreateProductSchema>;
