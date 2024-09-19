import { Router } from 'express';
import { validateRequest } from '../middlewares/validateRequest';
import { authController as controller } from '@/controllers/auth.controller';
import {
  userCreateCodeValidationSchema,
  userCreateSchema,
} from '@/types/user/userCreate.type';

const router = Router();

// Sign up
router.post('/signup', validateRequest(userCreateSchema), controller.signup);

// Verify Email
router.post(
  '/signup/verify-code',
  validateRequest(userCreateCodeValidationSchema),
  controller.checkEmailVerificationCode,
);

export default router;
