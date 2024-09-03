import { tenantRepository } from '@/repositories/tenantRepository';

export const tenantService = {
  checkEmailExists: async (email: string) => {
    const emailResult = await tenantRepository.getByOneField('email', email);
    const isEmailTaken = emailResult?.length ? true : false;
    return isEmailTaken;
  },
};
