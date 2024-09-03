import { Router } from 'express';
import {
  validateParamsId,
  validateRequest,
} from '../middlewares/validateRequest';
import { applicationCreateSchema } from '@/types/application/applicationCreate.type';
import { applicationController } from '@/controllers/applicationControllers';
import { applicationUpdateSchema } from '@/types/application/applicationUpdate.type';
// import { validateToken } from '../middlewares/authMiddleware';

const router = Router();

// JWT Secure Token
// router.use(validateToken);

// TODO: Add authorization by role

// Get all Applications paginated
router.get('/', applicationController.getAll);

// Create a Applications
router.post('/', validateRequest(applicationCreateSchema), applicationController.create);

// Get a Application by ID
router.get(
  '/:applicationId',
  validateParamsId('applicationId'),
  applicationController.getById,
);

// Update a Application by ID
router.put(
  '/:applicationId',
  validateRequest(applicationUpdateSchema),
  validateParamsId('applicationId'),
  applicationController.update,
);

// Delete a Application by ID
router.delete(
  '/:applicationId',
  validateParamsId('applicationId'),
  applicationController.delete,
);

export default router;
