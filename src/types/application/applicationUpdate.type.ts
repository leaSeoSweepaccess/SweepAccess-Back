import { z } from 'zod';
import { applicationSchema } from '@/schemas/application';

export const applicationUpdateSchema = applicationSchema
  .omit({
    isDeleted: true,
    createdAt: true,
    createdBy: true,
    updatedAt: true,
    updatedBy: true,
    deletedAt: true,
    deletedBy: true,
  })
  .partial();

export type ApplicationUpdate = z.infer<typeof applicationUpdateSchema>;
