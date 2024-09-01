import db from '@/db/dbClient';
import { createRepository } from './generic.repository';
import { CollaboratorTenant } from '@prisma/client';
import { CollaboratorTenantCreate } from '@/types/collaboratorTenant/collaboratorTenantCreate.type';
import { CollaboratorTenantUpdate } from '@/types/collaboratorTenant/collaboratorTenantUpdate.type';

export const collaboratorTenantRepository = createRepository<
  CollaboratorTenant,
  CollaboratorTenantCreate,
  CollaboratorTenantUpdate
>(db.collaboratorTenant);
