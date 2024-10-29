import * as z from "zod"
import { ProductTier } from "@prisma/client"
import { CompleteOrderDetail, relatedOrderDetailSchema } from "./index"

export const productSchema = z.object({
  id: z.string(),
  name: z.string(),
  tier: z.nativeEnum(ProductTier),
  amount: z.number(),
  currency: z.string(),
  createdAt: z.date().nullish(),
  createdBy: z.string().nullish(),
  updatedAt: z.date().nullish(),
  updatedBy: z.string().nullish(),
  deletedAt: z.date().nullish(),
  deletedBy: z.string().nullish(),
  isDeleted: z.boolean(),
})

export interface CompleteProduct extends z.infer<typeof productSchema> {
  orderDetails: CompleteOrderDetail[]
}

/**
 * relatedProductSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedProductSchema: z.ZodSchema<CompleteProduct> = z.lazy(() => productSchema.extend({
  orderDetails: relatedOrderDetailSchema.array(),
}))
