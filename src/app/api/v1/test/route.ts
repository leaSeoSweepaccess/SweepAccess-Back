import { tenantRepository } from '@/repositories/tenant/tenantRepository';
import { type Request, type Response } from 'express';

export const GET = async (req: Request, res: Response) => {
  // const { id } = req.params;

  // const result = await tenantRepository.findByEmail('asd@mail.com');
  // await tenantRepository.insert({
  //   name: 'leanputo',
  //   email: 'lean@puto.com',
  // });

  const result = await tenantRepository.getAll();
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
