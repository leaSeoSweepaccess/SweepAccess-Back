import db from '@/db/dbClient';
import { createRepository } from '../genericRepository';
import { Tenant } from '@prisma/client';
import { TenantCreate, TenantUpdate } from '@/types/tenantTypes';

const baseRepository = createRepository<Tenant, TenantCreate, TenantUpdate>(
  db.tenant,
);

export const tenantRepository = {
  ...baseRepository,

  async findByEmail(email: string) {
    return await db.tenant.findUnique({
      where: { email },
    });
  },
};
