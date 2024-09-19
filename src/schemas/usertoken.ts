import * as z from "zod"
import { CompleteUser, relatedUserSchema } from "./index"

export const userTokenSchema = z.object({
  id: z.number().int(),
  userId: z.string(),
  token: z.string(),
  createdAt: z.date(),
  expiresAt: z.date(),
})

export interface CompleteUserToken extends z.infer<typeof userTokenSchema> {
  user: CompleteUser
}

/**
 * relatedUserTokenSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedUserTokenSchema: z.ZodSchema<CompleteUserToken> = z.lazy(() => userTokenSchema.extend({
  user: relatedUserSchema,
}))
