import type { Request, Response } from 'express';
import { User } from '@prisma/client';
import { userRepository as repository } from '@/repositories/user.repository';
import { userService as service } from '@/services/user.service';
import {
  badRequestResponse,
  noContentResponse,
  successPaginatedResponse,
  successResponse,
} from '@/utils/httpResponses';
import { PaginationInput } from '@/types/paginationMeta';
import { pagination } from '@/utils/httpPagination';

const modelName = 'User';

export const userController = {
  update: async (req: Request, res: Response) => {
    try {
      const { userId } = req.params;
      const { body } = req;
      const email = body;

      const original = await repository.getById(userId);
      if (!original) throw `${modelName} not found`;

      // if email has changed, validate new one is not taken
      if (email && email !== original.email) {
        const doesEmailExist = await service.checkIfEmailExists(email);
        if (doesEmailExist) throw 'Email already taken';
      }

      const updateResult = await repository.update(userId, {
        ...original,
        ...body,
      });

      if (!updateResult) throw `${modelName} not updated`;

      return successResponse<User>(res, updateResult);
    } catch (error) {
      return badRequestResponse(res, error);
    }
  },

  delete: async (req: Request, res: Response) => {
    try {
      const { userId } = req.params;

      const original = await repository.getById(userId);
      if (!original) throw `Not found ${modelName} ID`;

      await repository.delete(userId);

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

      return successPaginatedResponse<User[]>(res, data, meta);
    } catch (error) {
      return badRequestResponse(res, error);
    }
  },

  getById: async (req: Request, res: Response) => {
    try {
      const { tenantId } = req.params;

      const data = await repository.getById(tenantId);
      if (!data) throw `Not found ${modelName} ID`;

      return successResponse<User>(res, data);
    } catch (error) {
      return badRequestResponse(res, error);
    }
  },
};
