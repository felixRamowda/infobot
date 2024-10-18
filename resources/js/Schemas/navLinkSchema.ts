import {z} from 'zod'

/**
 * Schema for validating navigation link objects.
 * 
 * This schema ensures that each navigation link object contains:
 * - `routename`: A string representing the route name.
 * - `active`: A boolean indicating whether the link is active.
 */
const LinkSchema = z.object({
    routename: z.string(),
    name: z.string()
    

})

export const NavlinksSchema = z.array(LinkSchema);