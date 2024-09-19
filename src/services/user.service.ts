import bcrypt from 'bcrypt';
import { userRepository as repository } from '@/repositories/user.repository';
import { User } from '@prisma/client';

export const userService = {
  checkIfEmailExists: async (email: string) => {
    const emailResult = await repository.getByOneField('email', email);
    return emailResult?.length ? true : false;
  },

  findByEmail: async (email: string) => {
    const result = await repository.getByOneField('email', email);
    if (!result) return;
    return result[0];
  },

  hashPassword: async (password: string) => {
    try {
      return bcrypt.hash(password, 10);
    } catch (error) {
      throw 'Error hashing password (bcrypt)'
    }
  },

  checkPassword: async (password: string, hash: string) => {
    return bcrypt.compare(password, hash);
  },

  createVerificationCode: () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  },

  setEmailAsVerified: async (user: User) => {
    const { id, ...rest } = user;

    return repository.update(id, {
      ...rest,
      isEmailVerified: true,
      emailVerificationCode: null,
    });
  },
};
