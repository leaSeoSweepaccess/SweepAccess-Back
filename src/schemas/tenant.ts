import * as z from "zod"
import { PaymentCycle } from "@prisma/client"
import { CompleteApplicationCollaboratorTenant, relatedApplicationCollaboratorTenantSchema, CompleteApplicationTenant, relatedApplicationTenantSchema, CompleteCollaboratorTenant, relatedCollaboratorTenantSchema, CompleteOrder, relatedOrderSchema, CompleteUser, relatedUserSchema, CompleteSeat, relatedSeatSchema } from "./index"

export const tenantSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
  avatar: z.string().url().nullish(),
  description: z.string().nullish(),
  url: z.string().url().nullish(),
  paymentCycle: z.nativeEnum(PaymentCycle).nullish(),
  createdAt: z.date().nullish(),
  createdBy: z.string().nullish(),
  updatedAt: z.date().nullish(),
  updatedBy: z.string().nullish(),
  deletedAt: z.date().nullish(),
  deletedBy: z.string().nullish(),
  isDeleted: z.boolean(),
})

export interface CompleteTenant extends z.infer<typeof tenantSchema> {
  ApplicationCollaboratorTenant: CompleteApplicationCollaboratorTenant[]
  ApplicationTenant: CompleteApplicationTenant[]
  CollaboratorTenant: CompleteCollaboratorTenant[]
  orders: CompleteOrder[]
  users: CompleteUser[]
  seats: CompleteSeat[]
}

/**
 * relatedTenantSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedTenantSchema: z.ZodSchema<CompleteTenant> = z.lazy(() => tenantSchema.extend({
  ApplicationCollaboratorTenant: relatedApplicationCollaboratorTenantSchema.array(),
  ApplicationTenant: relatedApplicationTenantSchema.array(),
  CollaboratorTenant: relatedCollaboratorTenantSchema.array(),
  orders: relatedOrderSchema.array(),
  users: relatedUserSchema.array(),
  seats: relatedSeatSchema.array(),
}))
