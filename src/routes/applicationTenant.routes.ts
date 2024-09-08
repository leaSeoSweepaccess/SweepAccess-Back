import { Router } from 'express';
import { applicationTenantController as controller } from '@/controllers/applicationTenant.controller';
import {
  validateParamsId,
  validateRequest,
} from '@/middlewares/validateRequest';
import { applicationTenantCreateSchema } from '@/types/applicationTenant/applicationTenantCreate.type';
import { applicationTenantUpdateSchema } from '@/types/applicationTenant/applicationTenantUpdate.type';

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
  validateRequest(applicationTenantCreateSchema),
  controller.create,
);

// Update payload of an Application to a Tenant
router.put(
  '/:tenantId/applications/:applicationId',
  validateParamsId('tenantId'),
  validateParamsId('applicationId'),
  validateRequest(applicationTenantUpdateSchema),
  controller.update,
);

router.delete(
  '/:tenantId/applications/:applicationId',
  validateParamsId('tenantId'),
  validateParamsId('applicationId'),
  controller.delete,
);

export default router;
