import { Router } from 'express';
import {
  validateParamsId,
  validateRequest,
} from '../middlewares/validateRequest';
import { collaboratorCreateSchema } from '@/types/collaborator/collaboratorCreate.type';
import { collaboratorController } from '@/controllers/collaborator.controller';
import { collaboratorUpdateSchema } from '@/types/collaborator/collaboratorUpdate.type';
// import { validateToken } from '../middlewares/authMiddleware';

const router = Router();

// JWT Secure Token
// router.use(validateToken);

// TODO: Add authorization by role

// Get all Collaborators paginated
router.get('/', collaboratorController.getAll);

// Create a Collaborators
router.post(
  '/',
  validateRequest(collaboratorCreateSchema),
  collaboratorController.create,
);

// Get a Collaborator by ID
router.get(
  '/:collaboratorId',
  validateParamsId('collaboratorId'),
  collaboratorController.getById,
);

// Update a Collaborator by ID
router.put(
  '/:collaboratorId',
  validateParamsId('collaboratorId'),
  validateRequest(collaboratorUpdateSchema),
  collaboratorController.update,
);

// Delete a Collaborator by ID
router.delete(
  '/:collaboratorId',
  validateParamsId('collaboratorId'),
  collaboratorController.delete,
);

export default router;
