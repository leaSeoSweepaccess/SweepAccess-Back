import env from '@/config/env';
import { ENTITIES } from '@/constants/entities';

export const genericValidateId = (model: string, id: string) => {
  const [prefix, code] = id?.split('_');

  let success = true;

  if (!id) success = false;

  if (prefix !== ENTITIES[model.toLowerCase()]?.prefix) success = false;

  if (code?.length !== env.DB_ID_LENGTH) success = false;

  return { success };
};
