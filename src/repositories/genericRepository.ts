import { generateDbId } from '@/utils/generateDbId';

export const createRepository = <T, C, U>(model: any) => ({
  getAll: async (): Promise<T[] | null | undefined> => {
    return model.findMany({
      omit: {
        isDeleted: true,
        deletedAt: true,
      },
      where: {
        isDeleted: false,
      },
    });
  },

  getAllPaginated: async (
    page: number = 1,
    limit: number = 100,
  ): Promise<T[] | null | undefined> => {
    return model.findMany({
      omit: {
        isDeleted: true,
        deletedAt: true,
      },
      skip: (page - 1) * limit,
      take: limit,
      where: {
        isDeleted: false,
      },
    });
  },

  getAllTotal: async (): Promise<number> => {
    return model.count({
      where: {
        isDeleted: false,
      },
    });
  },

  getById: async (id: string): Promise<T | null | undefined> => {
    if (!id) return null;
    return model.findUnique({
      omit: {
        isDeleted: true,
        deletedAt: true,
      },
      where: { id, isDeleted: false },
    });
  },

  getByOneField: async (
    field: string,
    value: string | number | boolean | Date,
  ): Promise<T[] | null | undefined> => {
    if (!field || value === undefined) return;

    return model.findMany({
      omit: {
        isDeleted: true,
        deletedAt: true,
      },
      where: {
        [field]: value,
        isDeleted: false,
      },
    });
  },

  insert: async (element: C): Promise<T | null | undefined> => {
    return await model.create({
      omit: {
        isDeleted: true,
        deletedAt: true,
      },
      data: { ...element, id: generateDbId('tenant') },
    });
  },

  update: async (id: string, element: U): Promise<T | null | undefined> => {
    return model.update({
      omit: {
        isDeleted: true,
        deletedAt: true,
      },
      where: { id, isDeleted: false },
      data: { ...element },
    });
  },

  delete: async (id: string): Promise<T | null | undefined> => {
    return model.update({
      omit: {
        isDeleted: true,
        deletedAt: true,
      },
      where: { id, isDeleted: false },
      data: {
        isDeleted: true,
        deletedAt: new Date(),
      },
    });
  },
});
