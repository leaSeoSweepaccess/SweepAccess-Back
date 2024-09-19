import * as z from "zod"
import { CompleteCollaborator, relatedCollaboratorSchema, CompleteTenant, relatedTenantSchema } from "./index"

// Helper schema for JSON fields
type Literal = boolean | number | string
type Json = Literal | { [key: string]: Json } | Json[]
const literalSchema = z.union([z.string(), z.number(), z.boolean()])
const jsonSchema: z.ZodSchema<Json> = z.lazy(() => z.union([literalSchema, z.array(jsonSchema), z.record(jsonSchema)]))

export const collaboratorTenantSchema = z.object({
  collaboratorId: z.string(),
  tenantId: z.string(),
  isDeleted: z.boolean(),
  createdBy: z.string().nullish(),
  updatedBy: z.string().nullish(),
  deletedAt: z.date().nullish(),
  deletedBy: z.string().nullish(),
  createdAt: z.date().nullish(),
  updatedAt: z.date().nullish(),
  jsonData: jsonSchema,
})

export interface CompleteCollaboratorTenant extends z.infer<typeof collaboratorTenantSchema> {
  Collaborator: CompleteCollaborator
  Tenant: CompleteTenant
}

/**
 * relatedCollaboratorTenantSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedCollaboratorTenantSchema: z.ZodSchema<CompleteCollaboratorTenant> = z.lazy(() => collaboratorTenantSchema.extend({
  Collaborator: relatedCollaboratorSchema,
  Tenant: relatedTenantSchema,
}))
