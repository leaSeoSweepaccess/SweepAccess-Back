import { z } from 'zod';
import { applicationCollaboratorSchema } from '@/schemas/applicationcollaborator';

const applicationCollaboratorUpdateSchema = applicationCollaboratorSchema
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
    collaboratorId: true,
  });

export type ApplicationCollaboratorUpdate = z.infer<
  typeof applicationCollaboratorUpdateSchema
>;
