import type { Request, Response } from 'express';
import { Application } from '@prisma/client';
import { applicationRepository as repository } from '@/repositories/application.repository';
import { PaginationInput } from '@/types/paginationMeta';
import {
  badRequestResponse,
  createdResponse,
  noContentResponse,
  successPaginatedResponse,
  successResponse,
} from '@/utils/httpResponses';
import { pagination } from '@/utils/httpPagination';

const modelName = 'Application';

export const applicationController = {
  create: async (req: Request, res: Response) => {
    try {
      const { body } = req;

      const result = await repository.insert(body);
      if (!result) throw `${modelName} not inserted`;

      return createdResponse<Application>(res, result);
    } catch (error) {
      return badRequestResponse(res, error);
    }
  },

  update: async (req: Request, res: Response) => {
    try {
      const { applicationId } = req.params;
      const { body } = req;

      const original = await repository.getById(applicationId);
      if (!original) throw `${modelName} not found`;

      const updateResult = await repository.update(applicationId, {
        ...original,
        ...body,
      });

      if (!updateResult) throw `${modelName} not updated`;

      return successResponse<Application>(res, updateResult);
    } catch (error) {
      return badRequestResponse(res, error);
    }
  },

  delete: async (req: Request, res: Response) => {
    try {
      const { applicationId } = req.params;

      const original = await repository.getById(applicationId);
      if (!original) throw `Not found ${modelName} ID`;

      await repository.delete(applicationId);

      return noContentResponse(res);
    } catch (error) {
      return badRequestResponse(res, error);
    }
  },

  getAll: async (req: Request, res: Response) => {
    try {
      const searchParams = req.query as PaginationInput;
      const { page, limit } = pagination.getPageAndLimit(searchParams);

      const [data, total] = await Promise.all([
        repository.getAllPaginated(page, limit),
        repository.getAllTotal(),
      ]);

      if (!data?.length || !total) {
        return successResponse(res, []);
      }

      const meta = pagination.createMeta(page, limit, total);

      return successPaginatedResponse<Application[]>(res, data, meta);
    } catch (error) {
      return badRequestResponse(res, error);
    }
  },

  getById: async (req: Request, res: Response) => {
    try {
      const { applicationId } = req.params;

      const data = await repository.getById(applicationId);
      if (!data) throw `Not found ${modelName} ID`;

      return successResponse<Application>(res, data);
    } catch (error) {
      return badRequestResponse(res, error);
    }
  },
};
