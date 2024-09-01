import db from '@/db/dbClient';
import { createRepository } from './generic.repository';
import { ApplicationTenant } from '@prisma/client';
import { ApplicationTenantCreate } from '@/types/applicationTenant/applicationTenantCreate.type';
import { ApplicationTenantUpdate } from '@/types/applicationTenant/applicationTenantUpdate.type';

export const applicationTenantRepository = createRepository<
  ApplicationTenant,
  ApplicationTenantCreate,
  ApplicationTenantUpdate
>(db.applicationTenant);
