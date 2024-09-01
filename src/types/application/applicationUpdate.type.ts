import { z } from 'zod';
import { applicationSchema } from '@/schemas/application';

const applicationUpdateSchema = applicationSchema
  .omit({
    isDeleted: true,
    createAt: true,
    createdBy: true,
    updateAt: true,
    updatedBy: true,
    deletedAt: true,
    deletedBy: true,
  })
  .partial()
  .required({
    id: true,
  });

export type ApplicationUpdate = z.infer<typeof applicationUpdateSchema>;
