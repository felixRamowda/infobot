import z from "zod";

export const ArticleCreateSchema = z.object({
 title: z
  .string()
  .max(255, {
   message: "Title must be at most 255 characters long",
  })
  .min(1, {
   message: "Title is required",
  }),
 price: z
  .string()
  .min(1, {
   message: "Price is required",
  })
  .refine((price) => !isNaN(parseFloat(price)), {
   message: "Price must be a number",
  }),
 description: z
  .string()
  .min(1, {
   message: "Description is required",
  })
  .max(65535, {
   message: "Description must be at most 65535 characters long",
  }),
 imageUrl: z.any(),
});
