import { z } from 'zod';
import { collaboratorTenantSchema } from '@/schemas/collaboratortenant';

export const collaboratorTenantUpdateSchema = collaboratorTenantSchema
  .omit({
    isDeleted: true,
    createdAt: true,
    createdBy: true,
    updatedAt: true,
    updatedBy: true,
    deletedAt: true,
    deletedBy: true,
  })
  .partial();

export type CollaboratorTenantUpdate = z.infer<
  typeof collaboratorTenantUpdateSchema
>;
