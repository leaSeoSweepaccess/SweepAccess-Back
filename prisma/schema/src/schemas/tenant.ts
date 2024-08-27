import * as z from "zod"
import { CompleteCollaborator, relatedCollaboratorSchema } from "./index"

export const tenantSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().nullish(),
  url: z.string().nullish(),
  avatar: z.string().url().nullish(),
  email: z.string().email().nullish(),
  isDeleted: z.boolean(),
  createdAt: z.date().nullish(),
  updatedAt: z.date().nullish(),
  deletedAt: z.date().nullish(),
})

export interface CompleteTenant extends z.infer<typeof tenantSchema> {
  collaborators: CompleteCollaborator[]
}

/**
 * relatedTenantSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedTenantSchema: z.ZodSchema<CompleteTenant> = z.lazy(() => tenantSchema.extend({
  collaborators: relatedCollaboratorSchema.array(),
}))
