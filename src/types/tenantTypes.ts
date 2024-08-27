import { z } from 'zod';
import { tenantSchema } from '@/schemas/tenant';

// Create
export const tenantCreateSchema = tenantSchema.pick({
  name: true,
  email: true,
});

export type TenantCreate = z.infer<typeof tenantCreateSchema>;

// Update
export const tenantUpdateSchema = tenantSchema
  .pick({
    name: true,
    email: true,
  })
  .partial();

export type TenantUpdate = z.infer<typeof tenantUpdateSchema>;
