import * as z from "zod"
import { CompleteApplication, relatedApplicationSchema, CompleteCollaborator, relatedCollaboratorSchema, CompleteTenant, relatedTenantSchema } from "./index"

// Helper schema for JSON fields
type Literal = boolean | number | string
type Json = Literal | { [key: string]: Json } | Json[]
const literalSchema = z.union([z.string(), z.number(), z.boolean()])
const jsonSchema: z.ZodSchema<Json> = z.lazy(() => z.union([literalSchema, z.array(jsonSchema), z.record(jsonSchema)]))

export const applicationCollaboratorSchema = z.object({
  applicationId: z.string(),
  collaboratorId: z.string(),
  tenantId: z.string(),
  jsonData: jsonSchema,
  isDeleted: z.boolean(),
  createdAt: z.date().nullish(),
  createdBy: z.string().nullish(),
  updatedAt: z.date().nullish(),
  updatedBy: z.string().nullish(),
  deletedAt: z.date().nullish(),
  deletedBy: z.string().nullish(),
})

export interface CompleteApplicationCollaborator extends z.infer<typeof applicationCollaboratorSchema> {
  Application: CompleteApplication
  Collaborator: CompleteCollaborator
  Tenant: CompleteTenant
}

/**
 * relatedApplicationCollaboratorSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedApplicationCollaboratorSchema: z.ZodSchema<CompleteApplicationCollaborator> = z.lazy(() => applicationCollaboratorSchema.extend({
  Application: relatedApplicationSchema,
  Collaborator: relatedCollaboratorSchema,
  Tenant: relatedTenantSchema,
}))
