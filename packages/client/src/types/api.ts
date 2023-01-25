export type ApiResponse<Data> = {
  statusCode: number;
  message?: string;
  data?: Data;
};
