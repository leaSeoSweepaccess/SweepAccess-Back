import db from '@/config/dbClient';
import { createRepository } from './generic.repository';
import { UserToken } from '@prisma/client';
import { UserTokenCreate } from '@/types/userToken/userTokenCreate.type';

const isAutoincrement = true;

export const userTokenRepository = createRepository<
  UserToken,
  UserTokenCreate,
  any
>(db.userToken, isAutoincrement);
