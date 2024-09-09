import { Router } from 'express';
import { applicationCollaboratorTenantController as controller } from '@/controllers/applicationCollaboratorTenant.controller';
import {
  validateParamsId,
  validateRequest,
} from '@/middlewares/validateRequest';
import { applicationCollaboratorTenantUpdateSchema } from '@/types/applicationCollaboratorTenant/applicationCollaboratorTenantUpdate.type';
import { applicationCollaboratorTenantCreateSchema } from '@/types/applicationCollaboratorTenant/applicationCollaboratorTenantCreate.type';

const router = Router({ mergeParams: true });

// JWT Secure Token
// router.use(validateToken);

// TODO: Add authorization by role

// Get all Collaborators a Tenant paginated
router.get(
  '/:tenantId/collaborators/:collaboratorId/applications',
  validateParamsId('tenantId'),
  validateParamsId('collaboratorId'),
  controller.getAll,
);

// Get an Collaborator for a Tenant
router.get(
  '/:tenantId/collaborators/:collaboratorId/applications/:applicationId',
  validateParamsId('tenantId'),
  validateParamsId('collaboratorId'),
  validateParamsId('applicationId'),
  controller.getById,
);

// Assign an Collaborator to a Tenant
router.post(
  '/:tenantId/collaborators/:collaboratorId/applications/:applicationId',
  validateParamsId('tenantId'),
  validateParamsId('collaboratorId'),
  validateParamsId('applicationId'),
  validateRequest(applicationCollaboratorTenantCreateSchema),
  controller.create,
);

// Update payload of an Collaborator to a Tenant
router.put(
  '/:tenantId/collaborators/:collaboratorId/applications/:applicationId',
  validateParamsId('tenantId'),
  validateParamsId('collaboratorId'),
  validateParamsId('applicationId'),
  validateRequest(applicationCollaboratorTenantUpdateSchema),
  controller.update,
);

router.delete(
  '/:tenantId/collaborators/:collaboratorId/applications/:applicationId',
  validateParamsId('tenantId'),
  validateParamsId('collaboratorId'),
  validateParamsId('applicationId'),
  controller.delete,
);

export default router;
