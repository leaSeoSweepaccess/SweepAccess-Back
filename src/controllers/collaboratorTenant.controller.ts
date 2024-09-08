import type { Request, Response } from 'express';
import { CollaboratorTenant } from '@prisma/client';
import { collaboratorTenantRepository as repository } from '@/repositories/collaboratorTenant.repository';
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

export const collaboratorTenantController = {
  create: async (req: Request, res: Response) => {
    try {
      const { collaboratorId, tenantId } = req.params;
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
          { collaboratorId, tenantId },
        ])) as CollaboratorTenant;

        return successResponse<CollaboratorTenant>(res, result);
      }

      const result = await repository.insert({
        collaboratorId,
        tenantId,
        ...body,
      });

      if (!result) throw `${modelName} not inserted`;

      return createdResponse<CollaboratorTenant>(res, result);
    } catch (error) {
      logger.error(error);
      return badRequestResponse(res, error);
    }
  },

  update: async (req: Request, res: Response) => {
    try {
      const { collaboratorId, tenantId } = req.params;
      const { body } = req;

      const original = await repository.getById([{ collaboratorId, tenantId }]);
      if (!original) throw `${modelName} not found`;

      const updateResult = await repository.update(
        [{ collaboratorId, tenantId }],
        { ...body },
      );

      if (!updateResult) throw `${modelName} not updated`;

      return successResponse<CollaboratorTenant>(res, updateResult);
    } catch (error) {
      logger.error(error);
      return badRequestResponse(res, error);
    }
  },

  delete: async (req: Request, res: Response) => {
    try {
      const { collaboratorId, tenantId } = req.params;

      const original = await repository.getById([{ collaboratorId, tenantId }]);
      if (!original) throw `Not found ${modelName} ID`;

      await repository.delete([{ collaboratorId, tenantId }]);

      return noContentResponse(res);
    } catch (error) {
      logger.error(error);
      return badRequestResponse(res, error);
    }
  },

  getAll: async (req: Request, res: Response) => {
    try {
      const { tenantId } = req.params;

      const searchParams = req.query as PaginationInput;
      const { page, limit } = pagination.getPageAndLimit(searchParams);

      const [data, total] = await Promise.all([
        repository.getAllPaginated([{ tenantId }], page, limit),
        repository.getAllTotal([{ tenantId }]),
      ]);

      if (!data?.length || !total) {
        return successResponse(res, []);
      }

      const meta = pagination.createMeta(page, limit, total);

      return successPaginatedResponse<CollaboratorTenant[]>(res, data, meta);
    } catch (error) {
      logger.error(error);
      return badRequestResponse(res, error);
    }
  },

  getById: async (req: Request, res: Response) => {
    try {
      const { collaboratorId, tenantId } = req.params;

      const data = await repository.getById([{ collaboratorId, tenantId }]);
      if (!data) throw `Not found ${modelName} ID`;

      return successResponse<CollaboratorTenant>(res, data);
    } catch (error) {
      logger.error(error);
      return badRequestResponse(res, error);
    }
  },
};
