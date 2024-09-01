import { z } from 'zod';
import { collaboratorTenantSchema } from '@/schemas/collaboratortenant';

const collaboratorTenantUpdateSchema = collaboratorTenantSchema
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
    collaboratorId: true,
    tenantId: true,
  });

export type CollaboratorTenantUpdate = z.infer<
  typeof collaboratorTenantUpdateSchema
>;
