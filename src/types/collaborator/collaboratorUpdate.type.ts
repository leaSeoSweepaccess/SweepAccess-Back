import { z } from 'zod';
import { collaboratorSchema } from '@/schemas/collaborator';

const collaboratorUpdateSchema = collaboratorSchema
  .omit({
    isDeleted: true,
    createAt: true,
    createdBy: true,
    updateAt: true,
    updatedBy: true,
    deletedAt: true,
    deletedBy: true,
  })
  .partial()
  .required({
    id: true,
  });

export type CollaboratorUpdate = z.infer<typeof collaboratorUpdateSchema>;
