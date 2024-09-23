import { Router } from 'express';
import { zoomController } from '@/controllers/zoom.controller';

const router = Router();

// router.get('/event-webhook', zoomController.eventWebhook);
router.post('/event-webhook', zoomController.eventWebhook);

router.get('/auth/signup-url', zoomController.createSignupUrl);

router.get('/auth/callback', zoomController.authorizationCallback);

export default router;
