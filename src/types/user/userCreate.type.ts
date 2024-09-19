import { z } from 'zod';
import { userSchema } from '@/schemas/user';

export const userCreateSchema = userSchema
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
  .partial()
  .required({
    firstName: true,
    lastName: true,
    email: true,
  });

export type UserCreate = z.infer<typeof userCreateSchema>;
