import * as z from "zod"
import { OrderStatus } from "@prisma/client"
import { CompleteTenant, relatedTenantSchema } from "./index"

export const orderSchema = z.object({
  id: z.string(),
  tenantId: z.string(),
  amount: z.number(),
  currency: z.string(),
  status: z.nativeEnum(OrderStatus),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export interface CompleteOrder extends z.infer<typeof orderSchema> {
  tenant: CompleteTenant
}

/**
 * relatedOrderSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedOrderSchema: z.ZodSchema<CompleteOrder> = z.lazy(() => orderSchema.extend({
  tenant: relatedTenantSchema,
}))
