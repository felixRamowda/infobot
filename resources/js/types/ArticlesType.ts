import z from "zod";
import { ArticlesSchema } from "@/Schemas/ArticlesSchema"; //Array Object
import { ArticleSchema } from "@/Schemas/ArticlesSchema"; //object
import { ArticleCreateSchema } from "@/Schemas/ArticlesCreate";

export type ArticleType = z.infer<typeof ArticleSchema>;
export type ArticlesType = z.infer<typeof ArticlesSchema>;
/**
 * Type definition for creating an article.
 * This type is inferred from the ArticleCreateSchema using Zod.
 */
export type ArticleCreateType = z.infer<typeof ArticleCreateSchema>; //
