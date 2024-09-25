import { generateDbId } from '@/utils/generateDbId';

function hasId<T>(obj: T): obj is T & { id: any } {
  return (obj as any).id !== undefined;
}

const genericOmit = {
  // isDeleted: true,
  // deletedAt: true,
  // deletedBy: true,
};

export const createRepository = <T, C, U>(
  model: any,
  isAutoincrement = false,
) => ({
  getAll: async (): Promise<T[] | null | undefined> => {
    return model.findMany({
      omit: genericOmit,
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
      omit: genericOmit,
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

  getById: async (
    id: string,
    isDeleted = false,
  ): Promise<T | null | undefined> => {
    if (!id) return null;
    return model.findUnique({
      omit: genericOmit,
      where: { id, isDeleted },
    });
  },

  getByOneField: async (
    field: string,
    value: string | number | boolean | Date,
    isDeleted = false,
  ): Promise<T[] | null | undefined> => {
    if (!field || value === undefined) return;

    return model.findMany({
      omit: genericOmit,
      where: {
        [field]: value,
        isDeleted,
      },
    });
  },

  getByMultipleFields: async (
    fields: { [key: string]: any },
    includeIsDeleted = true,
  ): Promise<T[] | null | undefined> => {
    try {
      return model.findMany({
        omit: genericOmit,
        where: includeIsDeleted
          ? { ...fields, isDeleted: false }
          : { ...fields },
      });
    } catch (err) {
      console.log('err', err);
    }
  },

  insert: async (
    element: C,
    userId?: string,
  ): Promise<T | null | undefined> => {
    const doesId = hasId<C>(element);

    const data: C =
      doesId || isAutoincrement
        ? { ...element, createdBy: userId ?? 'system' }
        : {
            ...element,
            createdBy: userId ?? 'system',
            id: generateDbId(model),
          };

    return await model.create({
      omit: genericOmit,
      data,
    });
  },

  update: async (
    id: string,
    element: U,
    userId?: string,
  ): Promise<T | null | undefined> => {
    return model.update({
      omit: genericOmit,
      where: { id, isDeleted: false },
      data: { ...element, updatedBy: userId ?? 'system' },
    });
  },

  delete: async (
    id: string,
    userId?: string,
  ): Promise<T | null | undefined> => {
    return model.update({
      omit: genericOmit,
      where: { id, isDeleted: false },
      data: {
        isDeleted: true,
        deletedAt: new Date(),
        deletedBy: userId ?? 'system',
      },
    });
  },

  hardDelete: async (where: any) => {
    return model.deleteMany(where);
  },
});

export const createMultipleIdRepository = <T, C, U>(model: any) => ({
  ...createRepository<T, C, U>(model),

  getAll: async (
    ids: { [key: string]: string }[],
  ): Promise<T[] | null | undefined> => {
    return model.findMany({
      omit: genericOmit,
      where: { ...Object.assign({}, ...ids), isDeleted: false },
    });
  },

  getAllPaginated: async (
    ids: { [key: string]: string }[],
    page: number = 1,
    limit: number = 100,
  ): Promise<T[] | null | undefined> => {
    return model.findMany({
      omit: genericOmit,
      skip: (page - 1) * limit,
      take: limit,
      where: { ...Object.assign({}, ...ids), isDeleted: false },
    });
  },

  getAllTotal: async (ids: { [key: string]: string }[]): Promise<number> => {
    return model.count({
      where: { ...Object.assign({}, ...ids), isDeleted: false },
    });
  },

  getById: async (
    ids: { [key: string]: string }[],
  ): Promise<T | null | undefined> => {
    if (!ids || !ids.length) return null;

    const result: T[] = await model.findMany({
      omit: genericOmit,
      where: { ...Object.assign({}, ...ids), isDeleted: false },
    });

    return result[0];
  },

  geDeletedById: async (
    ids: { [key: string]: string }[],
  ): Promise<T | null | undefined> => {
    if (!ids || !ids.length) return null;

    const result: T[] = await model.findMany({
      omit: genericOmit,
      where: { ...Object.assign({}, ...ids), isDeleted: true },
    });

    return result[0];
  },

  insert: async (
    element: C,
    userId?: string,
  ): Promise<T | null | undefined> => {
    const data: C = { ...element, createdBy: userId ?? 'system' };

    return await model.create({
      omit: genericOmit,
      data,
    });
  },

  update: async (
    ids: { [key: string]: string }[],
    element: U,
    userId?: string,
  ): Promise<T | null | undefined> => {
    return await model.updateMany({
      // omit: genericOmit,
      where: { ...Object.assign({}, ...ids), isDeleted: false },
      data: { ...element, updatedBy: userId ?? 'system' },
    });
  },

  updateDeleted: async (
    ids: { [key: string]: string }[],
    element: U,
    userId?: string,
  ): Promise<T | null | undefined> => {
    try {
      const result = await model.updateMany({
        // omit: genericOmit,
        where: {
          ...Object.assign({}, ...ids),
          isDeleted: true,
          deletedAt: null,
        },
        data: {
          ...element,
          updatedBy: userId ?? 'system',
          isDeleted: false,
          deletedAt: null,
        },
      });

      return result;
    } catch (error) {
      console.log('error', error);
    }
  },

  delete: async (
    ids: { [key: string]: string }[],
    userId?: string,
  ): Promise<T | null | undefined> => {
    return model.updateMany({
      // omit: genericOmit,
      where: { ...Object.assign({}, ...ids), isDeleted: false },
      data: {
        isDeleted: true,
        deletedAt: new Date(),
        deletedBy: userId ?? 'system',
      },
    });
  },
});
