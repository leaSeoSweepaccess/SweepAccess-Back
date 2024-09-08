import db from '@/config/dbClient';
import { createMultipleIdRepository } from './generic.repository';
import { CollaboratorTenant } from '@prisma/client';
import { CollaboratorTenantCreate } from '@/types/collaboratorTenant/collaboratorTenantCreate.type';
import { CollaboratorTenantUpdate } from '@/types/collaboratorTenant/collaboratorTenantUpdate.type';

export const collaboratorTenantRepository = createMultipleIdRepository<
  CollaboratorTenant,
  CollaboratorTenantCreate,
  CollaboratorTenantUpdate
>(db.collaboratorTenant);
