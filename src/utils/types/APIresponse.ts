export type APIResponse<T> = {
  isSuccess: boolean;
  code: string;
  message: string;
  result: T;
};

export type PaginationDTO = {
  cursor?: number;
  limit?: number;
  search?: string;
};
