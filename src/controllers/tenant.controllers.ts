import type { Request, Response } from 'express';
import { Tenant } from '@prisma/client';
import { tenantRepository } from '@/repositories/tenant.repository';
import { tenantService } from '@/services/tenant.service';
import { PaginationInput } from '@/types/paginationMeta';
import { tenantCreateSchema } from '@/types/tenant/tenantCreate.type';
import { tenantUpdateSchema } from '@/types/tenant/tenantUpdate.type';
import { handleZodError } from '@/utils/handleZodErrors';
import {
  badRequestResponse,
  createdResponse,
  internalServerErrorResponse,
  noContentResponse,
  notFoundResponse,
  successPaginatedResponse,
  successResponse,
} from '@/utils/httpResponses';
import { pagination } from '@/utils/httpPagination';

const create = async (req: Request, res: Response) => {
  try {
    const { body } = req;
    if (!body) {
      return badRequestResponse(res, 'Missing payload');
    }

    const { success, data, error } = tenantCreateSchema.safeParse(body);
    if (!success) {
      return badRequestResponse(res, handleZodError(error));
    }

    const doesEmailExist = await tenantService.checkEmailExists(data.email);
    if (!doesEmailExist) {
      return badRequestResponse(res, 'Email already taken');
    }

    const result = await tenantRepository.insert(data);
    if (!result) {
      return internalServerErrorResponse(res, 'Tenant not inserted');
    }

    return createdResponse<Tenant>(res, result);
  } catch (error) {
    return internalServerErrorResponse(res);
  }
};

const update = async (req: Request, res: Response) => {
  try {
    const { tenantId } = req.params;
    if (!tenantId) {
      return badRequestResponse(res, 'Missing Tenant ID');
    }
    tenantService.validateId(tenantId);

    const { body } = req;
    if (!body) {
      return badRequestResponse(res, 'Missing payload');
    }

    const { success, data, error } = tenantUpdateSchema.safeParse(body);
    if (!success) {
      return badRequestResponse(res, handleZodError(error));
    }

    const original = await tenantRepository.getById(tenantId);
    if (!original) {
      return notFoundResponse(res);
    }

    console.log('data.email', data.email);
    console.log('original.email', original.email);

    // if email has changed, validate new one is not taken
    if (data.email && data?.email !== original.email) {
      const doesEmailExist = await tenantService.checkEmailExists(data.email);
      if (doesEmailExist) {
        return badRequestResponse(res, 'Email already taken');
      }
    }

    const updatedTenant = await tenantRepository.update(tenantId, {
      ...original,
      ...data,
    });
    if (!updatedTenant) {
      return internalServerErrorResponse(res, 'Tenant not updated');
    }

    return successResponse<Tenant>(res, updatedTenant);
  } catch (error) {
    return internalServerErrorResponse(res);
  }
};

const del = async (req: Request, res: Response) => {
  try {
    const { tenantId } = req.params;
    if (!tenantId) {
      return badRequestResponse(res, 'Missing Tenant ID');
    }
    tenantService.validateId(tenantId);

    const original = await tenantRepository.getById(tenantId);
    if (!original) {
      return notFoundResponse(res);
    }

    const result = await tenantRepository.delete(tenantId);
    if (!result) {
      return notFoundResponse(res);
    }

    return noContentResponse(res);
  } catch (error) {
    return internalServerErrorResponse(res);
  }
};

const getAll = async (req: Request, res: Response) => {
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
    return internalServerErrorResponse(res);
  }
};

const getById = async (req: Request, res: Response) => {
  try {
    const { tenantId } = req.params;
    if (!tenantId) {
      return badRequestResponse(res, 'Missing Tenant ID');
    }
    tenantService.validateId(tenantId);

    const data = await tenantRepository.getById(tenantId);
    if (!data) {
      return notFoundResponse(res);
    }

    return successResponse<Tenant>(res, data);
  } catch (error) {
    return internalServerErrorResponse(res);
  }
};

export const tenantController = {
  create,
  update,
  delete: del,
  getAll,
  getById,
};
