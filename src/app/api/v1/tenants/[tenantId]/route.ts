import { type Request, type Response } from 'express';
import { tenantController } from '@/controllers/tenant.controllers';

/**
 * Get a Tenant by ID
 */
export const GET = async (req: Request, res: Response) => {
  return tenantController.getById(req, res);
};

/**
 * Update a Tenant by ID
 */
export const PUT = async (req: Request, res: Response) => {
  return tenantController.update(req, res);
};

/**
 * Delete a Tenant by ID
 */
export const DELETE = async (req: Request, res: Response) => {
  return tenantController.delete(req, res);
};
