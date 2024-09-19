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
    password: true,
  });

export type UserCreate = z.infer<typeof userCreateSchema>;

export const userCreateCodeValidationSchema = z.object({
  email: z.string().email(),
  code: z.string().length(6),
});

export type UserCreateCodeValidation = z.infer<
  typeof userCreateCodeValidationSchema
>;
