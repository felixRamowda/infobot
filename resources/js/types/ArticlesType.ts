import z from 'zod';
import { ArticlesSchema } from '@/Schemas/ArticlesSchema';//Array Object
import { ArticleSchema } from '@/Schemas/ArticlesSchema'; //object
import { ArticleCreateSchema } from '@/Schemas/ArticlesCreate';

export type ArticlesType = z.infer<typeof ArticlesSchema>
export type ArticleType = z.infer<typeof ArticleSchema>
export type ArticleCreateType = z.infer<typeof ArticleCreateSchema>
