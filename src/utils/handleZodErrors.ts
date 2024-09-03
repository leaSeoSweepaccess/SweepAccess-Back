import { ZodError } from 'zod';

export const handleZodError = (error: any) => {
  const zodError = error as ZodError;
  const message = zodError.flatten().fieldErrors;
  // TODO: Add Logger
  return message;
};
