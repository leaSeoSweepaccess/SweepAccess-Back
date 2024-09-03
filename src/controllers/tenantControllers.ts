import type { Request, Response } from 'express';
import { Tenant } from '@prisma/client';
import { tenantRepository } from '@/repositories/tenantRepository';
import { tenantService } from '@/services/tenantService';
import { PaginationInput } from '@/types/paginationMeta';
import {
  badRequestResponse,
  createdResponse,
  noContentResponse,
  notFoundResponse,
  successPaginatedResponse,
  successResponse,
} from '@/utils/httpResponses';
import { pagination } from '@/utils/httpPagination';

export const tenantController = {
  create: async (req: Request, res: Response) => {
    try {
      const { body } = req;

      const doesEmailExist = await tenantService.checkEmailExists(body.email);
      if (doesEmailExist) throw 'Email already taken';

      const result = await tenantRepository.insert(body);
      if (!result) throw 'Tenant not inserted';

      console.log('mariano2');
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

      const original = await tenantRepository.getById(tenantId);
      if (!original) {
        return notFoundResponse(res);
      }

      // if email has changed, validate new one is not taken
      if (email && email !== original.email) {
        const doesEmailExist = await tenantService.checkEmailExists(email);
        if (doesEmailExist) throw 'Email already taken';
      }

      const updateResult = await tenantRepository.update(tenantId, {
        ...original,
        ...body,
      });

      if (!updateResult) throw 'Tenant not updated';

      return successResponse<Tenant>(res, updateResult);
    } catch (error) {
      return badRequestResponse(res, error);
    }
  },

  delete: async (req: Request, res: Response) => {
    try {
      const { tenantId } = req.params;

      const original = await tenantRepository.getById(tenantId);
      if (!original) throw `Not found Tenant ID`;

      await tenantRepository.delete(tenantId);

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
        tenantRepository.getAllPaginated(page, limit),
        tenantRepository.getAllTotal(),
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

      const data = await tenantRepository.getById(tenantId);
      if (!data) throw `Not found Tenant ID`;

      return successResponse<Tenant>(res, data);
    } catch (error) {
      return badRequestResponse(res, error);
    }
  },
};
