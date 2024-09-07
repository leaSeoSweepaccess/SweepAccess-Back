import db from '@/config/dbClient';
import { createRepository } from './generic.repository';
import { ApplicationCollaborator } from '@prisma/client';
import { ApplicationCollaboratorCreate } from '@/types/applicationCollaborator/applicationCollaboratorCreate.type';
import { ApplicationCollaboratorUpdate } from '@/types/applicationCollaborator/applicationCollaboratorUpdate.type';

export const applicationCollaboratorRepository = createRepository<
  ApplicationCollaborator,
  ApplicationCollaboratorCreate,
  ApplicationCollaboratorUpdate
>(db.applicationCollaborator);
