import type { Request, Response } from 'express';
import { Collaborator } from '@prisma/client';
import { collaboratorRepository as repository } from '@/repositories/collaborator.repository';
import { PaginationInput } from '@/types/paginationMeta';
import {
  badRequestResponse,
  createdResponse,
  noContentResponse,
  successPaginatedResponse,
  successResponse,
} from '@/utils/httpResponses';
import { pagination } from '@/utils/httpPagination';

const modelName = 'Collaborator';

export const collaboratorController = {
  create: async (req: Request, res: Response) => {
    try {
      const { body } = req;

      const result = await repository.insert(body);
      if (!result) throw `${modelName} not inserted`;

      return createdResponse<Collaborator>(res, result);
    } catch (error) {
      return badRequestResponse(res, error);
    }
  },

  update: async (req: Request, res: Response) => {
    try {
      const { collaboratorId } = req.params;
      const { body } = req;

      const original = await repository.getById(collaboratorId);
      if (!original) throw `${modelName} not found`;

      const updateResult = await repository.update(collaboratorId, {
        ...original,
        ...body,
      });

      if (!updateResult) throw `${modelName} not updated`;

      return successResponse<Collaborator>(res, updateResult);
    } catch (error) {
      return badRequestResponse(res, error);
    }
  },

  delete: async (req: Request, res: Response) => {
    try {
      const { collaboratorId } = req.params;

      const original = await repository.getById(collaboratorId);
      if (!original) throw `Not found ${modelName} ID`;

      await repository.delete(collaboratorId);

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

      return successPaginatedResponse<Collaborator[]>(res, data, meta);
    } catch (error) {
      return badRequestResponse(res, error);
    }
  },

  getById: async (req: Request, res: Response) => {
    try {
      const { collaboratorId } = req.params;

      const data = await repository.getById(collaboratorId);
      if (!data) throw `Not found ${modelName} ID`;

      return successResponse<Collaborator>(res, data);
    } catch (error) {
      return badRequestResponse(res, error);
    }
  },
};
