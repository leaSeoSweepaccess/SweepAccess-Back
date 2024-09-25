import { userRepository as repository } from '@/repositories/user.repository';

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
};
