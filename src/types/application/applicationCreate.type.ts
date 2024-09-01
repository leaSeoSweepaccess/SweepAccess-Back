import { z } from 'zod';
import { applicationSchema } from '@/schemas/application';

const applicationCreateSchema = applicationSchema
  .omit({
    id: true,
    isDeleted: true,
    createAt: true,
    createdBy: true,
    updateAt: true,
    updatedBy: true,
    deletedAt: true,
    deletedBy: true,
  })
  .partial({
    description: true,
    avatar: true,
    jsonData: true,
  })
  .required({
    name: true,
    url: true,
  });

export type ApplicationCreate = z.infer<typeof applicationCreateSchema>;
