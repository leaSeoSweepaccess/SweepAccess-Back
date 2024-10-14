import * as z from "zod"
import { CompleteTenant, relatedTenantSchema, CompleteUser, relatedUserSchema } from "./index"

export const seatSchema = z.object({
  id: z.string(),
  tenantId: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export interface CompleteSeat extends z.infer<typeof seatSchema> {
  tenant: CompleteTenant
  user?: CompleteUser | null
}

/**
 * relatedSeatSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedSeatSchema: z.ZodSchema<CompleteSeat> = z.lazy(() => seatSchema.extend({
  tenant: relatedTenantSchema,
  user: relatedUserSchema.nullish(),
}))
