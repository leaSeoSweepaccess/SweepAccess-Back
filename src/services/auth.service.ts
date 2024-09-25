import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import env from '@/config/env';
import { userRepository as repository } from '@/repositories/user.repository';
import { UserCreate } from '@/types/user/userCreate.type';
import { User } from '@prisma/client';
import { userTokenRepository } from '@/repositories/userToken.repository';
import { addTimeToDate } from '@/utils/addTimeToDate';
import { userSessionRepository } from '@/repositories/userSession.repository';

export const authService = {
  // sign up
  hashPassword: async (password: string) => {
    return bcrypt.hash(password, 10);
  },

  createVerificationCode: async () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  },

  createUser: async (user: UserCreate) => {
    const hashedPassword = await authService.hashPassword(user.password!);
    const emailVerificationCode = await authService.createVerificationCode();

    return repository.insert({
      ...user,
      password: hashedPassword,
      emailVerificationCode,
    });
  },

  setEmailAsVerified: async (user: User) => {
    const { id, ...rest } = user;

    return repository.update(id, {
      ...rest,
      isEmailVerified: true,
      emailVerificationCode: null,
    });
  },
  //

  checkPassword: async (password: string, hash: string) => {
    return bcrypt.compare(password, hash);
  },

  createAccessToken: async (userId: string) => {
    const accessToken = jwt.sign({ userId }, env.ACCESS_JWT_SECRET, {
      expiresIn: env.ACCESS_TOKEN_EXPIRES_IN,
    });

    // await userTokenRepository.hardDelete({
    //   where: { userId },
    // });

    await userTokenRepository.insert({
      userId,
      token: accessToken,
      expiresAt: addTimeToDate(new Date(), env.ACCESS_TOKEN_EXPIRES_IN),
    });

    return accessToken;
  },

  fetchRefreshToken: async (userId: string, refreshToken: string) => {
    return userSessionRepository.getByMultipleFields(
      {
        userId,
        refreshToken,
      },
      false,
    );
  },

  createRefreshToken: async (userId: string) => {
    const refreshToken = jwt.sign({ userId }, env.REFRESH_JWT_SECRET, {
      expiresIn: env.REFRESH_TOKEN_EXPIRES_IN,
    });

    await userSessionRepository.insert({
      userId,
      refreshToken: refreshToken,
      expiresAt: addTimeToDate(new Date(), env.REFRESH_TOKEN_EXPIRES_IN),
    });

    return refreshToken;
  },

  generateTokens: async (userId: string) => {
    const accessToken = await authService.createAccessToken(userId);
    const refreshToken = await authService.createRefreshToken(userId);

    return { accessToken, refreshToken };
  },
};
