import { z } from 'zod';
import { applicationCollaboratorTenantSchema } from '@/schemas/applicationcollaboratortenant';

export const applicationCollaboratorTenantCreateSchema =
  applicationCollaboratorTenantSchema
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

export type ApplicationCollaboratorTenantCreate = z.infer<
  typeof applicationCollaboratorTenantCreateSchema
>;
