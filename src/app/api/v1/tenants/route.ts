import { type Request, type Response } from 'express';
import { tenantController } from '@/controllers/tenant.controllers';

/**
 * Get all Tenants paginated
 */
export const GET = async (req: Request, res: Response) => {
  return tenantController.getAll(req, res);
};

/**
 * Create a Tenants
 */
export const POST = async (req: Request, res: Response) => {
  return tenantController.create(req, res);
};
