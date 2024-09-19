import * as z from "zod"
import { CompleteApplicationCollaboratorTenant, relatedApplicationCollaboratorTenantSchema, CompleteCollaboratorTenant, relatedCollaboratorTenantSchema } from "./index"

export const collaboratorSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  username: z.string().nullish(),
  firstName: z.string().nullish(),
  lastName: z.string().nullish(),
  avatar: z.string().url().nullish(),
  isDeleted: z.boolean(),
  deletedAt: z.date().nullish(),
  createdBy: z.string().nullish(),
  deletedBy: z.string().nullish(),
  updatedBy: z.string().nullish(),
  createdAt: z.date().nullish(),
  updatedAt: z.date().nullish(),
})

export interface CompleteCollaborator extends z.infer<typeof collaboratorSchema> {
  ApplicationCollaboratorTenant: CompleteApplicationCollaboratorTenant[]
  CollaboratorTenant: CompleteCollaboratorTenant[]
}

/**
 * relatedCollaboratorSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedCollaboratorSchema: z.ZodSchema<CompleteCollaborator> = z.lazy(() => collaboratorSchema.extend({
  ApplicationCollaboratorTenant: relatedApplicationCollaboratorTenantSchema.array(),
  CollaboratorTenant: relatedCollaboratorTenantSchema.array(),
}))
