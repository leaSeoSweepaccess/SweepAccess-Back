import type { Request } from 'express';
import bcrypt from 'bcrypt';
import jwt, { JwtPayload } from 'jsonwebtoken';
import env from '@/config/env';
import { userRepository as repository } from '@/repositories/user.repository';
import { UserCreate } from '@/types/user/userCreate.type';
import { User } from '@prisma/client';
import { userTokenRepository } from '@/repositories/userToken.repository';
import { addTimeToDate } from '@/utils/addTimeToDate';
import { userSessionRepository } from '@/repositories/userSession.repository';
import logger from '@/logger';

export const authService = {
  hash: async (password: string) => {
    return bcrypt.hash(password, env.HASH_SALT);
  },

  createVerificationCode: async () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  },

  createUser: async (user: UserCreate) => {
    const hashedPassword = await authService.hash(user.password!);
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

  checkHash: async (value: string, hash: string) => {
    return bcrypt.compare(value, hash);
  },

  createAccessToken: async (userId: string) => {
    try {
      const accessToken = jwt.sign({ userId }, env.ACCESS_JWT_SECRET, {
        expiresIn: env.ACCESS_TOKEN_EXPIRES_IN,
      });

      // await userTokenRepository.hardDelete({
      //   where: { userId },
      // });

      const hashedToken = await authService.hash(accessToken);

      await userTokenRepository.insert({
        userId,
        token: hashedToken,
        expiresAt: addTimeToDate(new Date(), env.ACCESS_TOKEN_EXPIRES_IN),
      });

      return accessToken;
    } catch (error) {
      logger.error(error);
      throw new Error('Failed to create access token');
    }
  },

  fetchRefreshToken: async (userId: string, refreshToken: string) => {
    const sessions = await userSessionRepository.getByMultipleFields(
      { userId },
      false,
    );

    const session = sessions?.find(async (result) => {
      return authService.checkHash(refreshToken, result.refreshToken);
    });

    return session;
  },

  createRefreshToken: async (userId: string) => {
    try {
      const refreshToken = jwt.sign({ userId }, env.REFRESH_JWT_SECRET, {
        expiresIn: env.REFRESH_TOKEN_EXPIRES_IN,
      });

      const hashedRefreshToken = await authService.hash(refreshToken);

      await userSessionRepository.insert({
        userId,
        refreshToken: hashedRefreshToken,
        expiresAt: addTimeToDate(new Date(), env.REFRESH_TOKEN_EXPIRES_IN),
      });

      return refreshToken;
    } catch (error) {
      logger.error(error);
      throw new Error('Failed to create refresh token');
    }
  },

  generateTokens: async (userId: string) => {
    const accessToken = await authService.createAccessToken(userId);
    const refreshToken = await authService.createRefreshToken(userId);

    return { accessToken, refreshToken };
  },

  getTokenFromHeader: async (req: Request) => {
    const authHeader = req.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new Error('No token provided');
    }

    const token = authHeader.split(' ')[1];

    return token;
  },

  verifyBearerToken: async (token: string) => {
    return jwt.verify(token, env.ACCESS_JWT_SECRET as string) as JwtPayload;
  },

  deleteBearerToken: async (userId: string) => {
    await userTokenRepository.hardDelete({ userId });
  },

  deleteRefreshToken: async (userId: string) => {
    await userSessionRepository.hardDelete({ userId });
  },

  signout: async (userId: string) => {
    await userTokenRepository.hardDelete({ userId });
    await userSessionRepository.hardDelete({ userId });
  },
};
