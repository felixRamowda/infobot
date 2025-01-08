import { title } from "process";
import { string, z } from "zod";

export const ArticleSchema = z.object({
 id: z.number(),
 title: z.string().max(255),
 price: z.number(), // float
 description: z.string(),
 imageUrl: z.string().url(),
});

export const ArticlesSchema = z.array(ArticleSchema);
