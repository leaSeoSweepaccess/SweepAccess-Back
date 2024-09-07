import { Router } from 'express';
import {
  validateParamsId,
  validateRequest,
} from '../middlewares/validateRequest';
import { tenantCreateSchema } from '@/types/tenant/tenantCreate.type';
import { tenantController as controller } from '@/controllers/tenantControllers';
import { tenantUpdateSchema } from '@/types/tenant/tenantUpdate.type';
// import { validateToken } from '../middlewares/authMiddleware';

const router = Router();

// JWT Secure Token
// router.use(validateToken);

// TODO: Add authorization by role

// Get all Tenants paginated
router.get('/', controller.getAll);

// Create a Tenants
router.post('/', validateRequest(tenantCreateSchema), controller.create);

// Get a Tenant by ID
router.get('/:tenantId', validateParamsId('tenantId'), controller.getById);

// Update a Tenant by ID
router.put(
  '/:tenantId',
  validateRequest(tenantUpdateSchema),
  validateParamsId('tenantId'),
  controller.update,
);

// Delete a Tenant by ID
router.delete('/:tenantId', validateParamsId('tenantId'), controller.delete);

export default router;
