import * as z from "zod"
import { CompleteApplicationCollaborator, relatedApplicationCollaboratorSchema, CompleteApplicationTenant, relatedApplicationTenantSchema } from "./index"

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
  avatar: z.string().url().nullish(),
  jsonData: jsonSchema,
  isDeleted: z.boolean(),
  createdAt: z.date().nullish(),
  createdBy: z.string().nullish(),
  updatedAt: z.date().nullish(),
  updatedBy: z.string().nullish(),
  deletedAt: z.date().nullish(),
  deletedBy: z.string().nullish(),
})

export interface CompleteApplication extends z.infer<typeof applicationSchema> {
  ApplicationCollaborator: CompleteApplicationCollaborator[]
  ApplicationTenant: CompleteApplicationTenant[]
}

/**
 * relatedApplicationSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedApplicationSchema: z.ZodSchema<CompleteApplication> = z.lazy(() => applicationSchema.extend({
  ApplicationCollaborator: relatedApplicationCollaboratorSchema.array(),
  ApplicationTenant: relatedApplicationTenantSchema.array(),
}))
