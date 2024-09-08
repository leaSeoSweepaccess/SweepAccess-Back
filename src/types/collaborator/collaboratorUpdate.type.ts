import { z } from 'zod';
import { collaboratorSchema } from '@/schemas/collaborator';

export const collaboratorUpdateSchema = collaboratorSchema
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

export type CollaboratorUpdate = z.infer<typeof collaboratorUpdateSchema>;
