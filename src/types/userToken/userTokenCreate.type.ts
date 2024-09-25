import { z } from 'zod';
import { userTokenSchema } from '@/schemas/usertoken';

export const userTokenCreateSchema = userTokenSchema
  .omit({
    id: true,
    createdAt: true,
  })
  .required({
    userId: true,
    token: true,
    expiresAt: true,
  });

export type UserTokenCreate = z.infer<typeof userTokenCreateSchema>;
