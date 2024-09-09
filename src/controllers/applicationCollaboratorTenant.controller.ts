import type { Request, Response } from 'express';
import { ApplicationCollaboratorTenant } from '@prisma/client';
import { applicationCollaboratorTenantRepository as repository } from '@/repositories/applicationCollaboratorTenant.repository';
import { PaginationInput } from '@/types/paginationMeta';
import {
  badRequestResponse,
  createdResponse,
  noContentResponse,
  successPaginatedResponse,
  successResponse,
} from '@/utils/httpResponses';
import { pagination } from '@/utils/httpPagination';
import logger from '@/logger';

const modelName = 'CollaboratorTenant';

export const applicationCollaboratorTenantController = {
  create: async (req: Request, res: Response) => {
    try {
      const { applicationId, collaboratorId, tenantId } = req.params;
      const { body } = req;

      const original = await repository.geDeletedById([
        { collaboratorId, tenantId },
      ]);

      if (original?.isDeleted) {
        const updateResult = await repository.updateDeleted(
          [{ collaboratorId, tenantId }],
          { ...body },
        );

        if (!updateResult) throw `${modelName} not updated`;

        const result = (await repository.getById([
          { applicationId, collaboratorId, tenantId },
        ])) as ApplicationCollaboratorTenant;

        return successResponse<ApplicationCollaboratorTenant>(res, result);
      }

      const result = await repository.insert({
        applicationId,
        collaboratorId,
        tenantId,
        ...body,
      });

      if (!result) throw `${modelName} not inserted`;

      return createdResponse<ApplicationCollaboratorTenant>(res, result);
    } catch (error) {
      logger.error(error);
      return badRequestResponse(res, error);
    }
  },

  update: async (req: Request, res: Response) => {
    try {
      const { applicationId, collaboratorId, tenantId } = req.params;
      const { body } = req;

      const original = await repository.getById([
        { applicationId, collaboratorId, tenantId },
      ]);
      if (!original) throw `${modelName} not found`;

      const updateResult = await repository.update(
        [{ applicationId, collaboratorId, tenantId }],
        { ...body },
      );

      if (!updateResult) throw `${modelName} not updated`;

      return successResponse<ApplicationCollaboratorTenant>(res, updateResult);
    } catch (error) {
      logger.error(error);
      return badRequestResponse(res, error);
    }
  },

  delete: async (req: Request, res: Response) => {
    try {
      const { applicationId, collaboratorId, tenantId } = req.params;

      const original = await repository.getById([
        { applicationId, collaboratorId, tenantId },
      ]);
      if (!original) throw `Not found ${modelName} ID`;

      await repository.delete([{ applicationId, collaboratorId, tenantId }]);

      return noContentResponse(res);
    } catch (error) {
      logger.error(error);
      return badRequestResponse(res, error);
    }
  },

  getAll: async (req: Request, res: Response) => {
    try {
      const { collaboratorId, tenantId } = req.params;

      const searchParams = req.query as PaginationInput;
      const { page, limit } = pagination.getPageAndLimit(searchParams);

      const [data, total] = await Promise.all([
        repository.getAllPaginated([{ collaboratorId, tenantId }], page, limit),
        repository.getAllTotal([{ collaboratorId, tenantId }]),
      ]);

      if (!data?.length || !total) {
        return successResponse(res, []);
      }

      const meta = pagination.createMeta(page, limit, total);

      return successPaginatedResponse<ApplicationCollaboratorTenant[]>(
        res,
        data,
        meta,
      );
    } catch (error) {
      logger.error(error);
      return badRequestResponse(res, error);
    }
  },

  getById: async (req: Request, res: Response) => {
    try {
      const { applicationId, collaboratorId, tenantId } = req.params;

      const data = await repository.getById([
        { applicationId, collaboratorId, tenantId },
      ]);
      if (!data) throw `Not found ${modelName} ID`;

      return successResponse<ApplicationCollaboratorTenant>(res, data);
    } catch (error) {
      logger.error(error);
      return badRequestResponse(res, error);
    }
  },
};
