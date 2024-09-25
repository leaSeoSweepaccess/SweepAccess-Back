import type { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { userService } from '@/services/user.service';
import { authService } from '@/services/auth.service';
import {
  badRequestResponse,
  createdResponse,
  forbiddenResponse,
  noContentResponse,
  successResponse,
} from '@/utils/httpResponses';
import { User } from '@prisma/client';
import env from '@/config/env';

const modelName = 'Auth';

export const authController = {
  signup: async (req: Request, res: Response) => {
    try {
      const { email } = req.body;

      const isEmailTaken = await userService.checkIfEmailExists(email);
      if (isEmailTaken) throw 'Email already taken';

      const user = await authService.createUser({
        ...req.body,
      });
      if (!user) throw `${modelName} not inserted`;

      // await sendEmail(email, 'Verify your email', `Your code is: ${emailVerificationCode}`);

      return createdResponse<User>(res, user);
    } catch (error) {
      return badRequestResponse(res, error);
    }
  },

  signupCheckEmail: async (req: Request, res: Response) => {
    try {
      const { email, code } = req.body;

      const user = await userService.findByEmail(email);
      if (!user) throw 'Invalid user';

      if (user.emailVerificationCode !== code) {
        throw 'Invalid verification code';
      }

      const verified = await authService.setEmailAsVerified(user);
      if (!verified) {
        throw 'Email could not be verified';
      }

      return noContentResponse(res);
    } catch (error) {
      return badRequestResponse(res, error);
    }
  },

  signin: async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;

      const user = await userService.findByEmail(email);
      if (!user) throw 'Invalid credentials';

      const isPasswordVerified = await authService.checkPassword(
        password,
        user.password!,
      );
      if (!isPasswordVerified) throw 'Invalid credentials';

      const tokens = await authService.generateTokens(user.id);

      return successResponse<{ accessToken: string; refreshToken: string }>(
        res,
        { ...tokens },
      );
    } catch (error) {
      return badRequestResponse(res, error);
    }
  },

  refreshToken: async (req: Request, res: Response) => {
    try {
      const { refreshToken } = req.body;

      if (!refreshToken) throw 'No refresh token provided';

      const decoded: any = jwt.verify(refreshToken, env.REFRESH_JWT_SECRET);
      const userId = decoded.userId;

      const session = await authService.fetchRefreshToken(userId, refreshToken);
      if (!session) throw 'Invalid session';

      const newAccessToken = await authService.createAccessToken(userId);

      return successResponse<{ accessToken: string }>(res, {
        accessToken: newAccessToken,
      });
    } catch (error) {
      forbiddenResponse(res, error);
    }
  },
};
