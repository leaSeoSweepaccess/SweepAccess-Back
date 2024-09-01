import { z } from 'zod';
import { applicationTenantSchema } from '@/schemas/applicationtenant';

const applicationTenantCreateSchema = applicationTenantSchema
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
  })
  .required({
    applicationId: true,
    tenantId: true,
  });

export type ApplicationTenantCreate = z.infer<
  typeof applicationTenantCreateSchema
>;
