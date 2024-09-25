import db from '@/config/dbClient';
import { createRepository } from './generic.repository';
import { UserSession } from '@prisma/client';
import { UserSessionCreate } from '@/types/userSession/userSessionCreate.type';

const isAutoincrement = true;

export const userSessionRepository = createRepository<
  UserSession,
  UserSessionCreate,
  any
>(db.userSession, isAutoincrement);
