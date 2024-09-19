import * as z from "zod"
import { CompleteUserSession, relatedUserSessionSchema, CompleteUserToken, relatedUserTokenSchema } from "./index"

export const userSchema = z.object({
  id: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  password: z.string().nullish(),
  isEmailVerified: z.boolean(),
  emailVerificationCode: z.string().nullish(),
  isDeleted: z.boolean(),
  createdAt: z.date().nullish(),
  createdBy: z.string().nullish(),
  updatedAt: z.date().nullish(),
  updatedBy: z.string().nullish(),
  deletedAt: z.date().nullish(),
  deletedBy: z.string().nullish(),
})

export interface CompleteUser extends z.infer<typeof userSchema> {
  UserSession: CompleteUserSession[]
  UserToken: CompleteUserToken[]
}

/**
 * relatedUserSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedUserSchema: z.ZodSchema<CompleteUser> = z.lazy(() => userSchema.extend({
  UserSession: relatedUserSessionSchema.array(),
  UserToken: relatedUserTokenSchema.array(),
}))
