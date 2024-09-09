import db from '@/config/dbClient';
import { createMultipleIdRepository } from './generic.repository';
import { ApplicationCollaboratorTenant } from '@prisma/client';
import { ApplicationCollaboratorTenantCreate } from '@/types/applicationCollaboratorTenant/applicationCollaboratorTenantCreate.type';
import { ApplicationCollaboratorTenantUpdate } from '@/types/applicationCollaboratorTenant/applicationCollaboratorTenantUpdate.type';

export const applicationCollaboratorTenantRepository =
  createMultipleIdRepository<
    ApplicationCollaboratorTenant,
    ApplicationCollaboratorTenantCreate,
    ApplicationCollaboratorTenantUpdate
  >(db.applicationCollaboratorTenant);
