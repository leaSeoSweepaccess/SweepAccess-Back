import * as z from "zod"
import { CompleteUserSession, relatedUserSessionSchema, CompleteUserToken, relatedUserTokenSchema } from "./index"

export const userSchema = z.object({
  id: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  password: z.string().min(8, { message: "Password must be at least 8 characters long" }).max(20, { message: "Password cannot exceed 20 characters" }).regex(/\d/, { message: "Password must contain at least one number" }).regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" }).regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" }).regex(/[!@#$%^&*(),.?":{}|<>]/, { message: "Password must contain at least one special character" }).nullish(),
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
