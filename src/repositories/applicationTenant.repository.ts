import db from '@/config/dbClient';
import { createMultipleIdRepository } from './generic.repository';
import { ApplicationTenant } from '@prisma/client';
import { ApplicationTenantCreate } from '@/types/applicationTenant/applicationTenantCreate.type';
import { ApplicationTenantUpdate } from '@/types/applicationTenant/applicationTenantUpdate.type';

export const applicationTenantRepository = createMultipleIdRepository<
  ApplicationTenant,
  ApplicationTenantCreate,
  ApplicationTenantUpdate
>(db.applicationTenant);
