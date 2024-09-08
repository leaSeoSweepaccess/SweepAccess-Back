import { Router } from 'express';
import { applicationTenantController as controller } from '@/controllers/applicationTenant.controller';
import { validateParamsId } from '@/middlewares/validateRequest';

const router = Router({ mergeParams: true });

// JWT Secure Token
// router.use(validateToken);

// TODO: Add authorization by role

// Get all Applications a Tenant paginated
router.get(
  '/:tenantId/applications',
  validateParamsId('tenantId'),
  controller.getAll,
);

// Get an Application for a Tenant
router.get(
  '/:tenantId/applications/:applicationId',
  validateParamsId('tenantId'),
  validateParamsId('applicationId'),
  controller.getById,
);

// Assign an Application to a Tenant
router.post(
  '/:tenantId/applications/:applicationId',
  validateParamsId('tenantId'),
  validateParamsId('applicationId'),
  controller.create,
);

// Update payload of an Application to a Tenant
router.put(
  '/:tenantId/applications/:applicationId',
  validateParamsId('tenantId'),
  validateParamsId('applicationId'),
  controller.update,
);

router.delete(
  '/:tenantId/applications/:applicationId',
  validateParamsId('tenantId'),
  validateParamsId('applicationId'),
  controller.delete,
);

export default router;
