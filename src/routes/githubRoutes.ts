import { Router } from 'express';
import { githubController } from '@/controllers/githubController';

import env from '@/config/env';

const router = Router();

// Capture Github Code Callback
router.get('/auth/callback', githubController.authorizationCallback);

router.get('/auth/signup-url', githubController.createSignupUrl);

export default router;
