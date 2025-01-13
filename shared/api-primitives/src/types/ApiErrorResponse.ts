import { type ErrorResponse } from './ErrorResponse';

export type ApiErrorResponse = ErrorResponse<{
  name: 'ApiError';
  message: string;
}>;
