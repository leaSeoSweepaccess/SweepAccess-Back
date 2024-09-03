import { handleZodError } from '@/utils/handleZodErrors';
import { badRequestResponse } from '@/utils/httpResponses';
import { genericValidateId } from '@/utils/validateModelId';
import type { Request, Response, NextFunction } from 'express';
import { ZodSchema } from 'zod';

export function validateRequest(schema: ZodSchema<any>) {
  return (req: Request, res: Response, next: NextFunction) => {
    const { success, error } = schema.safeParse(req.body);

    if (!success) {
      return badRequestResponse(res, handleZodError(error));
    }

    next();
  };
}

export function validateParamsId(paramName: string) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const model = paramName.slice(0, -2);
      const capitalized =
        model.charAt(0).toUpperCase() + model.slice(1).toLowerCase();
      const param: string = req.params[paramName];
      if (!param) throw `Missing ${capitalized} ID`;

      const { success } = genericValidateId(model, param);
      if (!success) throw `Invalid ${capitalized} ID`;

      next();
    } catch (error) {
      return badRequestResponse(res, error);
    }
  };
}
