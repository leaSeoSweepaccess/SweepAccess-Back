import * as z from "zod"
import { CompleteApplication, relatedApplicationSchema, CompleteTenant, relatedTenantSchema } from "./index"

// Helper schema for JSON fields
type Literal = boolean | number | string
type Json = Literal | { [key: string]: Json } | Json[]
const literalSchema = z.union([z.string(), z.number(), z.boolean()])
const jsonSchema: z.ZodSchema<Json> = z.lazy(() => z.union([literalSchema, z.array(jsonSchema), z.record(jsonSchema)]))

export const applicationTenantSchema = z.object({
  applicationId: z.string(),
  tenantId: z.string(),
  jsonData: jsonSchema,
  isDeleted: z.boolean(),
  createdBy: z.string().nullish(),
  updatedBy: z.string().nullish(),
  deletedAt: z.date().nullish(),
  deletedBy: z.string().nullish(),
  createdAt: z.date().nullish(),
  updatedAt: z.date().nullish(),
})

export interface CompleteApplicationTenant extends z.infer<typeof applicationTenantSchema> {
  Application: CompleteApplication
  Tenant: CompleteTenant
}

/**
 * relatedApplicationTenantSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedApplicationTenantSchema: z.ZodSchema<CompleteApplicationTenant> = z.lazy(() => applicationTenantSchema.extend({
  Application: relatedApplicationSchema,
  Tenant: relatedTenantSchema,
}))
