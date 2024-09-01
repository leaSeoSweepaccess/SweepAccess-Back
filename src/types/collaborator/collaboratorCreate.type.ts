import { z } from 'zod';
import { collaboratorSchema } from '@/schemas/collaborator';

const collaboratorCreateSchema = collaboratorSchema
  .omit({
    id: true,
    isDeleted: true,
    createAt: true,
    createdBy: true,
    updateAt: true,
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
