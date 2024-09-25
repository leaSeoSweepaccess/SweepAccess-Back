import { z } from 'zod';

export const authSigninSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export type UserSignin = z.infer<typeof authSigninSchema>;
