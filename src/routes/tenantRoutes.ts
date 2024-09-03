import { Router } from 'express';
import {
  validateParamsId,
  validateRequest,
} from '../middlewares/validateRequest';
import { tenantCreateSchema } from '@/types/tenant/tenantCreate.type';
import { tenantController } from '@/controllers/tenantControllers';
import { tenantUpdateSchema } from '@/types/tenant/tenantUpdate.type';
// import { validateToken } from '../middlewares/authMiddleware';

const router = Router();

// JWT Secure Token
// router.use(validateToken);

// TODO: Add authorization by role

// Get all Tenants paginated
router.get('/', tenantController.getAll);

// Create a Tenants
router.post('/', validateRequest(tenantCreateSchema), tenantController.create);

// Get a Tenant by ID
router.get(
  '/:tenantId',
  validateParamsId('tenantId'),
  tenantController.getById,
);

// Update a Tenant by ID
router.put(
  '/:tenantId',
  validateRequest(tenantUpdateSchema),
  validateParamsId('tenantId'),
  tenantController.update,
);

// Delete a Tenant by ID
router.delete(
  '/:tenantId',
  validateParamsId('tenantId'),
  tenantController.delete,
);

export default router;
