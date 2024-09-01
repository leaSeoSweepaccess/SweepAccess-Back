import { z } from 'zod';
import { collaboratorTenantSchema } from '@/schemas/collaboratortenant';

const collaboratorTenantCreateSchema = collaboratorTenantSchema
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
    collaboratorId: true,
    tenantId: true,
  });

export type CollaboratorTenantCreate = z.infer<
  typeof collaboratorTenantCreateSchema
>;
