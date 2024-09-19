import * as z from "zod"
import { CompleteApplicationCollaboratorTenant, relatedApplicationCollaboratorTenantSchema, CompleteApplicationTenant, relatedApplicationTenantSchema } from "./index"

// Helper schema for JSON fields
type Literal = boolean | number | string
type Json = Literal | { [key: string]: Json } | Json[]
const literalSchema = z.union([z.string(), z.number(), z.boolean()])
const jsonSchema: z.ZodSchema<Json> = z.lazy(() => z.union([literalSchema, z.array(jsonSchema), z.record(jsonSchema)]))

export const applicationSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().nullish(),
  url: z.string().url().nullish(),
  isDeleted: z.boolean(),
  deletedAt: z.date().nullish(),
  avatar: z.string().url().nullish(),
  createdBy: z.string().nullish(),
  deletedBy: z.string().nullish(),
  jsonData: jsonSchema,
  updatedBy: z.string().nullish(),
  createdAt: z.date().nullish(),
  updatedAt: z.date().nullish(),
})

export interface CompleteApplication extends z.infer<typeof applicationSchema> {
  ApplicationCollaboratorTenant: CompleteApplicationCollaboratorTenant[]
  ApplicationTenant: CompleteApplicationTenant[]
}

/**
 * relatedApplicationSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedApplicationSchema: z.ZodSchema<CompleteApplication> = z.lazy(() => applicationSchema.extend({
  ApplicationCollaboratorTenant: relatedApplicationCollaboratorTenantSchema.array(),
  ApplicationTenant: relatedApplicationTenantSchema.array(),
}))
