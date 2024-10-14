import * as z from "zod"
import { SubscriptionTier } from "@prisma/client"
import { CompleteApplicationCollaboratorTenant, relatedApplicationCollaboratorTenantSchema, CompleteApplicationTenant, relatedApplicationTenantSchema, CompleteCollaboratorTenant, relatedCollaboratorTenantSchema, CompleteUser, relatedUserSchema, CompleteSeat, relatedSeatSchema, CompleteOrder, relatedOrderSchema } from "./index"

export const tenantSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
  deletedAt: z.date().nullish(),
  isDeleted: z.boolean(),
  avatar: z.string().url().nullish(),
  description: z.string().nullish(),
  url: z.string().url().nullish(),
  createdBy: z.string().nullish(),
  deletedBy: z.string().nullish(),
  updatedBy: z.string().nullish(),
  createdAt: z.date().nullish(),
  updatedAt: z.date().nullish(),
  subscriptionTier: z.nativeEnum(SubscriptionTier),
})

export interface CompleteTenant extends z.infer<typeof tenantSchema> {
  ApplicationCollaboratorTenant: CompleteApplicationCollaboratorTenant[]
  ApplicationTenant: CompleteApplicationTenant[]
  CollaboratorTenant: CompleteCollaboratorTenant[]
  users: CompleteUser[]
  seats: CompleteSeat[]
  orders: CompleteOrder[]
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
  users: relatedUserSchema.array(),
  seats: relatedSeatSchema.array(),
  orders: relatedOrderSchema.array(),
}))
