import type { Request, Response } from 'express';
import { Tenant } from '@prisma/client';
import { tenantRepository as repository } from '@/repositories/tenantRepository';
import { tenantService as service } from '@/services/tenantService';
import { PaginationInput } from '@/types/paginationMeta';
import {
  badRequestResponse,
  createdResponse,
  noContentResponse,
  successPaginatedResponse,
  successResponse,
} from '@/utils/httpResponses';
import { pagination } from '@/utils/httpPagination';

const modelName = 'Tenant';

export const tenantController = {
  create: async (req: Request, res: Response) => {
    try {
      const { body } = req;

      const doesEmailExist = await service.checkEmailExists(body.email);
      if (doesEmailExist) throw 'Email already taken';

      const result = await repository.insert(body);
      if (!result) throw `${modelName} not inserted`;

      return createdResponse<Tenant>(res, result);
    } catch (error) {
      return badRequestResponse(res, error);
    }
  },

  update: async (req: Request, res: Response) => {
    try {
      const { tenantId } = req.params;
      const { body } = req;
      const email = body;

      const original = await repository.getById(tenantId);
      if (!original) throw `${modelName} not found`;

      // if email has changed, validate new one is not taken
      if (email && email !== original.email) {
        const doesEmailExist = await service.checkEmailExists(email);
        if (doesEmailExist) throw 'Email already taken';
      }

      const updateResult = await repository.update(tenantId, {
        ...original,
        ...body,
      });

      if (!updateResult) throw `${modelName} not updated`;

      return successResponse<Tenant>(res, updateResult);
    } catch (error) {
      return badRequestResponse(res, error);
    }
  },

  delete: async (req: Request, res: Response) => {
    try {
      const { tenantId } = req.params;

      const original = await repository.getById(tenantId);
      if (!original) throw `Not found ${modelName} ID`;

      await repository.delete(tenantId);

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

      return successPaginatedResponse<Tenant[]>(res, data, meta);
    } catch (error) {
      return badRequestResponse(res, error);
    }
  },

  getById: async (req: Request, res: Response) => {
    try {
      const { tenantId } = req.params;

      const data = await repository.getById(tenantId);
      if (!data) throw `Not found ${modelName} ID`;

      return successResponse<Tenant>(res, data);
    } catch (error) {
      return badRequestResponse(res, error);
    }
  },
};
