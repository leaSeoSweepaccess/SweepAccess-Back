import { tenantRepository } from '@/repositories/tenant.repository';
import { genericValidateId } from '@/utils/validateModelId';

export const tenantService = {
  validateId: (tenantId: string) => {
    genericValidateId('tenant', tenantId);
  },

  checkEmailExists: async (email: string) => {
    const emailResult = await tenantRepository.getByOneField('email', email);
    const isEmailTaken = emailResult?.length ? true : false;
    return isEmailTaken;
  },
};
