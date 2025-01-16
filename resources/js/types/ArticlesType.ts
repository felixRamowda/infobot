import z from 'zod'
import { ArticlesSchema } from '@/Schemas/ArticlesSchema' //Array Object
import { ArticleSchema } from '@/Schemas/ArticlesSchema' //object
import { ArticleValidationSchema } from '@/Schemas/ArticlesCreate'

export type ArticleType = z.infer<typeof ArticleSchema>
export type ArticlesType = z.infer<typeof ArticlesSchema>
/**
 * Type definition for creating an article.
 * This type is inferred from the ArticleCreateSchema using Zod.
 */

//Hay   ue refactorizar este tipado ya que practicamente se usa para el crud completo!
export type ArticleValidationType = z.infer<typeof ArticleValidationSchema> //
