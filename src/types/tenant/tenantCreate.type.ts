import { z } from 'zod';
import { tenantSchema } from '@/schemas/tenant';

export const tenantCreateSchema = tenantSchema
  .omit({
    id: true,
    isDeleted: true,
    createdAt: true,
    createdBy: true,
    updatedAt: true,
    updatedBy: true,
    deletedAt: true,
    deletedBy: true,
  })
  .partial()
  .required({
    name: true,
    email: true,
  });

export type TenantCreate = z.infer<typeof tenantCreateSchema>;
