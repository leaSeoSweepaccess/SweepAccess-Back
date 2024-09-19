import db from '@/config/dbClient';
import { createRepository } from './generic.repository';
import { User } from '@prisma/client';
import { UserCreate } from '@/types/user/userCreate.type';
import { UserUpdate } from '@/types/user/userUpdate.type';

export const userRepository = createRepository<User, UserCreate, UserUpdate>(
  db.user,
);
