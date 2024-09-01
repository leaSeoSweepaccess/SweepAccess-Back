import { z } from 'zod';
import { tenantSchema } from '@/schemas/tenant';

const tenantCreateSchema = tenantSchema
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
  .partial({
    description: true,
    url: true,
    avatar: true,
  })
  .required({
    name: true,
    email: true,
  });

export type TenantCreate = z.infer<typeof tenantCreateSchema>;
