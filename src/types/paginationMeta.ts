export type PaginationMeta = {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};

export type GenericResponse = {
  status: number;
  success: boolean;
  data?: any;
  meta?: PaginationMeta;
};

export type PaginationInput = {
  page: string | number;
  limit: string | number;
  total: string | number;
  term?: string | number;
};
