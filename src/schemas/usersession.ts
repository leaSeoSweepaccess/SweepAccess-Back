import * as z from "zod"
import { CompleteUser, relatedUserSchema } from "./index"

export const userSessionSchema = z.object({
  id: z.number().int(),
  userId: z.string(),
  refreshToken: z.string(),
  createdAt: z.date(),
  createdBy: z.string().nullish(),
  expiresAt: z.date(),
})

export interface CompleteUserSession extends z.infer<typeof userSessionSchema> {
  user: CompleteUser
}

/**
 * relatedUserSessionSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedUserSessionSchema: z.ZodSchema<CompleteUserSession> = z.lazy(() => userSessionSchema.extend({
  user: relatedUserSchema,
}))
