import db from '@/db/dbClient';
import { createRepository } from './generic.repository';
import { Application } from '@prisma/client';
import { ApplicationCreate } from '@/types/application/applicationCreate.type';
import { ApplicationUpdate } from '@/types/application/applicationUpdate.type';

export const applicationRepository = createRepository<
  Application,
  ApplicationCreate,
  ApplicationUpdate
>(db.application);
