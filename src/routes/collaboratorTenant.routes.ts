import { Router } from 'express';
import { collaboratorTenantController as controller } from '@/controllers/collaboratorTenant.controller';
import { validateParamsId } from '@/middlewares/validateRequest';

const router = Router({ mergeParams: true });

// JWT Secure Token
// router.use(validateToken);

// TODO: Add authorization by role

// Get all Applications a Tenant paginated
router.get(
  '/:tenantId/collaborators',
  validateParamsId('tenantId'),
  controller.getAll,
);

// Get an Application for a Tenant
router.get(
  '/:tenantId/collaborators/:collaboratorId',
  validateParamsId('tenantId'),
  validateParamsId('collaboratorId'),
  controller.getById,
);

// Assign an Application to a Tenant
router.post(
  '/:tenantId/collaborators/:collaboratorId',
  validateParamsId('tenantId'),
  validateParamsId('collaboratorId'),
  controller.create,
);

// Update payload of an Application to a Tenant
router.put(
  '/:tenantId/collaborators/:collaboratorId',
  validateParamsId('tenantId'),
  validateParamsId('collaboratorId'),
  controller.update,
);

router.delete(
  '/:tenantId/collaborators/:collaboratorId',
  validateParamsId('tenantId'),
  validateParamsId('collaboratorId'),
  controller.delete,
);

export default router;
