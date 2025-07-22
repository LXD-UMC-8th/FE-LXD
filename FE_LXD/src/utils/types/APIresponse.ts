export type APIResponse<T> = {
  isSuccess: boolean;
  code: string;
  message: string;
  result: T;
};
