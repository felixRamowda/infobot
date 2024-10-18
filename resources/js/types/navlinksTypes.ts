import {z} from 'zod'
import { NavlinksSchema } from '@/Schemas/navLinkSchema'

/**
 * Type definition for navigation links.
 * 
 * This type is inferred from the `NavlinksSchema` using Zod's `infer` method.
 * It represents the structure of the navigation links used in the application.
 * 
 * @typedef {NavLinkstype}
 */
export type navLinkstype = z.infer<typeof NavlinksSchema>

