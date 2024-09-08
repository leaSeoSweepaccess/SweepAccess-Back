import * as z from "zod"
import { CompleteApplicationCollaboratorTenant, relatedApplicationCollaboratorTenantSchema, CompleteApplicationTenant, relatedApplicationTenantSchema, CompleteCollaboratorTenant, relatedCollaboratorTenantSchema } from "./index"

export const tenantSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().nullish(),
  url: z.string().url().nullish(),
  avatar: z.string().url().nullish(),
  email: z.string().email(),
  isDeleted: z.boolean(),
  createdAt: z.date().nullish(),
  createdBy: z.string().nullish(),
  updatedAt: z.date().nullish(),
  updatedBy: z.string().nullish(),
  deletedAt: z.date().nullish(),
  deletedBy: z.string().nullish(),
})

export interface CompleteTenant extends z.infer<typeof tenantSchema> {
  ApplicationCollaboratorTenant: CompleteApplicationCollaboratorTenant[]
  ApplicationTenant: CompleteApplicationTenant[]
  CollaboratorTenant: CompleteCollaboratorTenant[]
}

/**
 * relatedTenantSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedTenantSchema: z.ZodSchema<CompleteTenant> = z.lazy(() => tenantSchema.extend({
  ApplicationCollaboratorTenant: relatedApplicationCollaboratorTenantSchema.array(),
  ApplicationTenant: relatedApplicationTenantSchema.array(),
  CollaboratorTenant: relatedCollaboratorTenantSchema.array(),
}))
