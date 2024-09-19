import type { Request, Response } from 'express';
import { userRepository as repository } from '@/repositories/user.repository';
import { userService } from '@/services/user.service';
import {
  badRequestResponse,
  createdResponse,
  noContentResponse,
} from '@/utils/httpResponses';
import { User } from '@prisma/client';

const modelName = 'Auth';

export const authController = {
  signup: async (req: Request, res: Response) => {
    try {
      const { email, password, ...rest } = req.body;
      const hashedPassword = await userService.hashPassword(password);
      const emailVerificationCode = userService.createVerificationCode();

      const doesEmailExist = await userService.checkIfEmailExists(email);
      if (doesEmailExist) throw 'Email already taken';

      const result = await repository.insert({
        ...rest,
        email,
        emailVerificationCode,
        password: hashedPassword,
      });

      if (!result) throw `${modelName} not inserted`;

      // await sendEmail(email, 'Verify your email', `Your code is: ${emailVerificationCode}`);

      return createdResponse<User>(res, result);
    } catch (error) {
      return badRequestResponse(res, error);
    }
  },

  checkEmailVerificationCode: async (req: Request, res: Response) => {
    try {
      const { email, code } = req.body;

      const user = await userService.findByEmail(email);

      if (!user) {
        throw 'Invalid user';
      }

      if (user.emailVerificationCode !== code) {
        throw 'Invalid verification code';
      }

      const verified = await userService.setEmailAsVerified(user);
      if (!verified) {
        throw 'Email could not be verified';
      }

      return noContentResponse(res);
    } catch (error) {
      return badRequestResponse(res, error);
    }
  },

  // sign: async (req: Request, res: Response) => {
  //   const { body } = req;
  //   const { email, password } = body;

  //   const user = await userService.findByEmail(email);
  //   if (!user) throw 'Invalid credentials';

  //   const passwordVerified = await userService.verifyPassword(
  //     password,
  //     user.password!,
  //   );
  //   if (!passwordVerified) throw 'Invalid credentials';

  //   const tokens = authService.generateTokens(user.id);
  //   return successResponse<{ accessToken: string; refreshToken: string }>(res, {
  //     ...tokens,
  //   });
  // },
};
