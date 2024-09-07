import db from '@/config/dbClient';
import { createRepository } from './generic.repository';
import { Collaborator } from '@prisma/client';
import { CollaboratorCreate } from '@/types/collaborator/collaboratorCreate.type';
import { CollaboratorUpdate } from '@/types/collaborator/collaboratorUpdate.type';

export const collaboratorRepository = createRepository<
  Collaborator,
  CollaboratorCreate,
  CollaboratorUpdate
>(db.collaborator);
