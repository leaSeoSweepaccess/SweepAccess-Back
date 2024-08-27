import * as z from "zod"
import { CompleteTenant, relatedTenantSchema } from "./index"

export const collaboratorSchema = z.object({
  id: z.string(),
  tenantId: z.string(),
  email: z.string().email(),
  username: z.string().nullish(),
  firstName: z.string().nullish(),
  lastName: z.string().nullish(),
  avatar: z.string().url().nullish(),
  isDeleted: z.boolean(),
  createAt: z.date().nullish(),
  updateAt: z.date().nullish(),
  deletedAt: z.date().nullish(),
})

export interface CompleteCollaborator extends z.infer<typeof collaboratorSchema> {
  Tenant?: CompleteTenant | null
}

/**
 * relatedCollaboratorSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedCollaboratorSchema: z.ZodSchema<CompleteCollaborator> = z.lazy(() => collaboratorSchema.extend({
  Tenant: relatedTenantSchema.nullish(),
}))
