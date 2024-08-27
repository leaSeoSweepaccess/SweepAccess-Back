import * as z from "zod"
import { CompleteTenant, relatedTenantSchema } from "./index"

export const userSchema = z.object({
  id: z.string().nanoid(),
  email: z.string().email(),
  firstName: z.string().nullish(),
  lastName: z.string().nullish(),
  avatar: z.string().url().nullish(),
  role: z.string().nullish(),
  isDeleted: z.boolean(),
  tenantId: z.string(),
  createAt: z.date().nullish(),
  updateAt: z.date().nullish(),
  deletedAt: z.date().nullish(),
})

export interface CompleteUser extends z.infer<typeof userSchema> {
  Tenant?: CompleteTenant | null
}

/**
 * relatedUserSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedUserSchema: z.ZodSchema<CompleteUser> = z.lazy(() => userSchema.extend({
  Tenant: relatedTenantSchema.nullish(),
}))
