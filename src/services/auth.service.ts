// services/tokenService.ts
import jwt from 'jsonwebtoken';
// import { v4 as uuidv4 } from 'uuid';
import env from '@/config/env';

export const authService = {
  generateTokens: (userId: string) => {
    const accessToken = jwt.sign({ userId }, env.JWT_SECRET, {
      expiresIn: env.ACCESS_TOKEN_EXPIRES_IN,
    });

    const refreshToken = jwt.sign({ userId }, env.JWT_SECRET, {
      expiresIn: env.REFRESH_TOKEN_EXPIRES_IN,
    });

    // Save tokens to the database
    return { accessToken, refreshToken };
  },

  // export const createMagicLink = async (userId: string) => {
  //   const token = uuidv4();
  //   const expiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes

  //   return prisma.magicLink.create({
  //     data: {
  //       userId,
  //       token,
  //       expiresAt,
  //     },
  //   });
  // };
};
