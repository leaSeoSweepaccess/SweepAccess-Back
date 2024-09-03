import env from '@/config';
import { ENTITIES } from '@/constants/entities';

export const genericValidateId = (model: string, id: string) => {
  const capitalized =
    model.charAt(0).toUpperCase() + model.slice(1).toLowerCase();
  const errorMessage = `Invalid ${capitalized} ID "${id}"`;
  const [prefix, code] = id?.split('_');

  if (!id) throw errorMessage;

  if (prefix !== ENTITIES[model]?.prefix) throw errorMessage;

  if (code?.length !== env.DB_ID_LENGTH) throw errorMessage;
};
