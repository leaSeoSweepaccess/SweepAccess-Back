import { Router } from 'express';
import { slackController } from '@/controllers/slack.controller';

const router = Router();

router.get('/auth/signup-url', slackController.createSignupUrl);

router.get('/auth/callback', slackController.authorizationCallback);

export default router;
