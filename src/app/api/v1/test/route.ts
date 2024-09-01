import { applicationTenantRepository } from '@/repositories/applicationTenant.repository';
import { type Request, type Response } from 'express';

export const GET = async (req: Request, res: Response) => {
  const result = await applicationTenantRepository.insert({
    tenantId: 'ten_0SVUxE0G75Td',
    applicationId: 'app_qZ85PADchzz9',
    jsonData: { info: 'qwerty' },
  });

  return res.json(result);
};

export const POST = (req: Request, res: Response): void => {
  res.send('POST');
};

export const PUT = (req: Request, res: Response): void => {
  const { id } = req.params;
  res.send(`PUT: ${id}`);
};

export const PATCH = (req: Request, res: Response): void => {
  const { id } = req.params;
  res.send(`PATCH: ${id}`);
};

export const DEL = (req: Request, res: Response): void => {
  const { id } = req.params;
  res.send(`DEL: ${id}`);
};
