import { z } from 'zod';
import { applicationTenantSchema } from '@/schemas/applicationtenant';

const applicationTenantUpdateSchema = applicationTenantSchema
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
    applicationId: true,
    tenantId: true,
  });

export type ApplicationTenantUpdate = z.infer<
  typeof applicationTenantUpdateSchema
>;
