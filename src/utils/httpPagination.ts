import { PaginationInput, PaginationMeta } from '@/types/paginationMeta';

export const pagination = {
  getPageAndLimit: (
    searchParams: PaginationInput,
  ): { page: number; limit: number } => {
    const { page = 1, limit = 100 } = searchParams;

    return {
      page: Number(page),
      limit: Number(limit),
    };
  },

  createMeta: (
    page: number = 0,
    limit: number = 0,
    total: number = 0,
  ): PaginationMeta => {
    return {
      total: total ?? 0,
      page,
      limit,
      totalPages: total ? Math.ceil(total / limit) : 0,
    };
  },
};
