import { z } from 'zod';
import { applicationTenantSchema } from '@/schemas/applicationtenant';

export const applicationTenantCreateSchema = applicationTenantSchema
  .omit({
    isDeleted: true,
    createdAt: true,
    createdBy: true,
    updatedAt: true,
    updatedBy: true,
    deletedAt: true,
    deletedBy: true,
  })
  .partial({
    jsonData: true,
  });

export type ApplicationTenantCreate = z.infer<
  typeof applicationTenantCreateSchema
>;
