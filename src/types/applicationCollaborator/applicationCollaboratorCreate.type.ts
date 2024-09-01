import { z } from 'zod';
import { applicationCollaboratorSchema } from '@/schemas/applicationcollaborator';

const applicationCollaboratorCreateSchema = applicationCollaboratorSchema
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
    collaboratorId: true,
  });

export type ApplicationCollaboratorCreate = z.infer<
  typeof applicationCollaboratorCreateSchema
>;
