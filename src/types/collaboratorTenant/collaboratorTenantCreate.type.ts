import { z } from 'zod';
import { collaboratorTenantSchema } from '@/schemas/collaboratortenant';

export const collaboratorTenantCreateSchema = collaboratorTenantSchema
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

export type CollaboratorTenantCreate = z.infer<
  typeof collaboratorTenantCreateSchema
>;
