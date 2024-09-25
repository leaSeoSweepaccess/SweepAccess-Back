import { z } from 'zod';
import { userSessionSchema } from '@/schemas/usersession';

export const userSessionCreateSchema = userSessionSchema
  .omit({
    id: true,
    createdAt: true,
  })
  .required({
    userId: true,
    refreshToken: true,
    expiresAt: true,
  });

export type UserSessionCreate = z.infer<typeof userSessionCreateSchema>;
