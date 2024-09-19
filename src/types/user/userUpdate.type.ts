import { z } from 'zod';
import { userSchema } from '@/schemas/user';

export const userUpdateSchema = userSchema
  .omit({
    id: true,
    password: true,
    isDeleted: true,
    createdAt: true,
    createdBy: true,
    updatedAt: true,
    updatedBy: true,
    deletedAt: true,
    deletedBy: true,
  })
  .partial();

export type UserUpdate = z.infer<typeof userUpdateSchema>;
