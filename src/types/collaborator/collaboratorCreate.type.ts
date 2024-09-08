import { z } from 'zod';
import { collaboratorSchema } from '@/schemas/collaborator';

export const collaboratorCreateSchema = collaboratorSchema
  .omit({
    id: true,
    isDeleted: true,
    createdAt: true,
    createdBy: true,
    updatedAt: true,
    updatedBy: true,
    deletedAt: true,
    deletedBy: true,
  })
  .partial({
    username: true,
    firstName: true,
    lastName: true,
    avatar: true,
  })
  .required({
    email: true,
  });

export type CollaboratorCreate = z.infer<typeof collaboratorCreateSchema>;
