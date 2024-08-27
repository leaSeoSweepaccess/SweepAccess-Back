import { ENTITIES } from '@/constants/entities';
import env from '@/config';
import { customAlphabet } from './nanoId';

const generateUniqueId = (
  alphabet = '1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
  size = env.DB_ID_LENGTH,
): string => {
  return customAlphabet(alphabet, size)();
};

export const generateDbId = (entity: string) => {
  const prefix = ENTITIES[entity].prefix;
  if (!prefix) throw 'Invalid prefix for ID generation';

  const uniqueId = generateUniqueId();

  return `${prefix}_${uniqueId}`;
};
