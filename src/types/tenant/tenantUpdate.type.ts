import { z } from 'zod';
import { tenantSchema } from '@/schemas/tenant';

const tenantUpdateSchema = tenantSchema
  .omit({
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
    id: true,
  });

export type TenantUpdate = z.infer<typeof tenantUpdateSchema>;
