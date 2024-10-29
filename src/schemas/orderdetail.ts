import * as z from "zod"
import { CompleteProduct, relatedProductSchema } from "./index"

export const orderDetailSchema = z.object({
  id: z.string(),
  productId: z.string(),
  amount: z.number().int(),
  currency: z.string(),
  createdAt: z.date().nullish(),
  createdBy: z.string().nullish(),
  updatedAt: z.date().nullish(),
  updatedBy: z.string().nullish(),
})

export interface CompleteOrderDetail extends z.infer<typeof orderDetailSchema> {
  products: CompleteProduct
}

/**
 * relatedOrderDetailSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedOrderDetailSchema: z.ZodSchema<CompleteOrderDetail> = z.lazy(() => orderDetailSchema.extend({
  products: relatedProductSchema,
}))
