import { Router } from 'express';
import { validateRequest } from '../middlewares/validateRequest';
import { authController as controller } from '@/controllers/auth.controller';
import {
  userCreateCodeValidationSchema,
  userCreateSchema,
} from '@/types/user/userCreate.type';
import { authSigninSchema } from '@/types/auth/authSignin.type';
import z from 'zod';

const router = Router();

// Sign up
router.post('/signup', validateRequest(userCreateSchema), controller.signup);

// Sign up - Verify Email
router.post(
  '/signup/verify-code',
  validateRequest(userCreateCodeValidationSchema),
  controller.signupCheckEmail,
);

// Refresh Token
router.post(
  '/token',
  validateRequest(
    z.object({
      refreshToken: z.string(),
    }),
  ),
  controller.refreshToken,
);

// Sign in
router.post('/signin', validateRequest(authSigninSchema), controller.signin);

export default router;
