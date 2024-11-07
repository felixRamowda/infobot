import z from 'zod';

export const ArticleCreateSchema = z.object({
    title: z.string().max(255, {
        message: "title must be at most 255 characters long"
    }).nonempty({
        message: "title is required"
    }),
    price: z.string().refine((weight) => !isNaN(parseFloat(weight)), {
        message: "Price must be a number"
    }),
    description: z.string().max(65535, {
        message: "description must be at most 65535 characters long"
    }),
    imageUrl: z.any()
});