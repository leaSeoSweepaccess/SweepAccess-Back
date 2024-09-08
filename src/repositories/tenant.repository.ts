import db from '@/config/dbClient';
import { createRepository } from './generic.repository';
import { Tenant } from '@prisma/client';
import { TenantCreate } from '@/types/tenant/tenantCreate.type';
import { TenantUpdate } from '@/types/tenant/tenantUpdate.type';

const baseRepository = createRepository<Tenant, TenantCreate, TenantUpdate>(
  db.tenant,
);

export const tenantRepository = {
  ...baseRepository,

  async getByEmail(email: string) {
    return await db.tenant.findUnique({
      where: { email },
    });
  },
};
