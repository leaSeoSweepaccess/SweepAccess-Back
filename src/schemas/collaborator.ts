import * as z from "zod"
import { CompleteApplicationCollaborator, relatedApplicationCollaboratorSchema, CompleteCollaboratorTenant, relatedCollaboratorTenantSchema } from "./index"

export const collaboratorSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  username: z.string().nullish(),
  firstName: z.string().nullish(),
  lastName: z.string().nullish(),
  avatar: z.string().url().nullish(),
  isDeleted: z.boolean(),
  createdAt: z.date().nullish(),
  createdBy: z.string().nullish(),
  updatedAt: z.date().nullish(),
  updatedBy: z.string().nullish(),
  deletedAt: z.date().nullish(),
  deletedBy: z.string().nullish(),
})

export interface CompleteCollaborator extends z.infer<typeof collaboratorSchema> {
  ApplicationCollaborator: CompleteApplicationCollaborator[]
  CollaboratorTenant: CompleteCollaboratorTenant[]
}

/**
 * relatedCollaboratorSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedCollaboratorSchema: z.ZodSchema<CompleteCollaborator> = z.lazy(() => collaboratorSchema.extend({
  ApplicationCollaborator: relatedApplicationCollaboratorSchema.array(),
  CollaboratorTenant: relatedCollaboratorTenantSchema.array(),
}))
