import { Router } from 'express';
import { collaboratorTenantController as controller } from '@/controllers/collaboratorTenant.controller';
import {
  validateParamsId,
  validateRequest,
} from '@/middlewares/validateRequest';
import { collaboratorTenantUpdateSchema } from '@/types/collaboratorTenant/collaboratorTenantUpdate.type';
import { collaboratorTenantCreateSchema } from '@/types/collaboratorTenant/collaboratorTenantCreate.type';

const router = Router({ mergeParams: true });

// JWT Secure Token
// router.use(validateToken);

// TODO: Add authorization by role

// Get all Collaborators a Tenant paginated
router.get(
  '/:tenantId/collaborators',
  validateParamsId('tenantId'),
  controller.getAll,
);

// Get an Collaborator for a Tenant
router.get(
  '/:tenantId/collaborators/:collaboratorId',
  validateParamsId('tenantId'),
  validateParamsId('collaboratorId'),
  controller.getById,
);

// Assign an Collaborator to a Tenant
router.post(
  '/:tenantId/collaborators/:collaboratorId',
  validateParamsId('tenantId'),
  validateParamsId('collaboratorId'),
  validateRequest(collaboratorTenantCreateSchema),
  controller.create,
);

// Update payload of an Collaborator to a Tenant
router.put(
  '/:tenantId/collaborators/:collaboratorId',
  validateParamsId('tenantId'),
  validateParamsId('collaboratorId'),
  validateRequest(collaboratorTenantUpdateSchema),
  controller.update,
);

router.delete(
  '/:tenantId/collaborators/:collaboratorId',
  validateParamsId('tenantId'),
  validateParamsId('collaboratorId'),
  controller.delete,
);

export default router;
