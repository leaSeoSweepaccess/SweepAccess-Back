import { ENTITIES } from '@/constants/entities';
import env from '@/config';
import { customAlphabet } from './nanoId';

const generateUniqueId = (
  alphabet = '1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
  size = env.DB_ID_LENGTH
): string => {
  return customAlphabet(alphabet, size)();
};

export const generateDbId = (entity: any) => {
  const name = (entity?.name as string).toLowerCase();

  const prefix = ENTITIES[name]?.prefix;

  const uniqueId = generateUniqueId();

  if (prefix) {
    return `${prefix}_${uniqueId}`;
  }

  return uniqueId;
};
