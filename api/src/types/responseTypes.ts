export type ApiResponse<T = unknown> = {
  statusCode: number;
  message?: string;
  data?: T | T[];
};
