import type { Request, Response } from 'express';
import { ApplicationTenant } from '@prisma/client';
import { applicationTenantRepository as repository } from '@/repositories/applicationTenant.repository';
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

const modelName = 'ApplicationTenant';

export const applicationTenantController = {
  create: async (req: Request, res: Response) => {
    try {
      const { applicationId, tenantId } = req.params;
      const { body } = req;

      const original = await repository.geDeletedById([
        { applicationId, tenantId },
      ]);

      if (original?.isDeleted) {
        const updateResult = await repository.updateDeleted(
          [{ applicationId, tenantId }],
          { ...body },
        );

        if (!updateResult) throw `${modelName} not updated`;

        return successResponse<ApplicationTenant>(res, updateResult);
      }

      const result = await repository.insert({
        applicationId,
        tenantId,
        ...body,
      });

      if (!result) throw `${modelName} not inserted`;

      return createdResponse<ApplicationTenant>(res, result);
    } catch (error) {
      logger.error(error);
      return badRequestResponse(res, error);
    }
  },

  update: async (req: Request, res: Response) => {
    try {
      const { applicationId, tenantId } = req.params;
      const { body } = req;

      const original = await repository.getById([{ applicationId, tenantId }]);
      if (!original) throw `${modelName} not found`;

      const updateResult = await repository.update(
        [{ applicationId, tenantId }],
        { ...body },
      );

      if (!updateResult) throw `${modelName} not updated`;

      return successResponse<ApplicationTenant>(res, updateResult);
    } catch (error) {
      logger.error(error);
      return badRequestResponse(res, error);
    }
  },

  delete: async (req: Request, res: Response) => {
    try {
      const { applicationId, tenantId } = req.params;

      const original = await repository.getById([{ applicationId, tenantId }]);
      if (!original) throw `Not found ${modelName} ID`;

      await repository.delete([{ applicationId, tenantId }]);

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

      return successPaginatedResponse<ApplicationTenant[]>(res, data, meta);
    } catch (error) {
      logger.error(error);
      return badRequestResponse(res, error);
    }
  },

  getById: async (req: Request, res: Response) => {
    try {
      const { applicationId, tenantId } = req.params;

      const data = await repository.getById([{ applicationId, tenantId }]);
      if (!data) throw `Not found ${modelName} ID`;

      return successResponse<ApplicationTenant>(res, data);
    } catch (error) {
      logger.error(error);
      return badRequestResponse(res, error);
    }
  },
};
