import * as z from "zod"
import { SeatStatus } from "@prisma/client"
import { CompleteTenant, relatedTenantSchema, CompleteUser, relatedUserSchema } from "./index"

export const seatSchema = z.object({
  id: z.string(),
  tenantId: z.string(),
  userId: z.string(),
  status: z.nativeEnum(SeatStatus).nullish(),
  createdAt: z.date().nullish(),
  createdBy: z.string().nullish(),
  updatedAt: z.date().nullish(),
  updatedBy: z.string().nullish(),
  deletedAt: z.date().nullish(),
  deletedBy: z.string().nullish(),
  isDeleted: z.boolean(),
})

export interface CompleteSeat extends z.infer<typeof seatSchema> {
  tenant: CompleteTenant
  user: CompleteUser
}

/**
 * relatedSeatSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedSeatSchema: z.ZodSchema<CompleteSeat> = z.lazy(() => seatSchema.extend({
  tenant: relatedTenantSchema,
  user: relatedUserSchema,
}))
