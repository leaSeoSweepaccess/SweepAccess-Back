import { type Request, type Response } from 'express';

export const GET = (req: Request, res: Response): void => {
  const { id } = req.params;
  res.send(`GET 2 ${id}`);
};

export const POST = (req: Request, res: Response): void => {
  res.send('POST 2');
};

export const PUT = (req: Request, res: Response): void => {
  const { id } = req.params;
  res.send(`PUT  2 : ${id}`);
};

export const PATCH = (req: Request, res: Response): void => {
  const { id } = req.params;
  res.send(`PATCH: ${id}`);
};

export const DEL = (req: Request, res: Response): void => {
  const { id } = req.params;
  res.send(`DEL: ${id}`);
};
