import { type ErrorResponse } from './ErrorResponse';

export type ValidationErrorResponse = ErrorResponse<{
  name: 'ValidationError';
  errors: {
    path: (string | number)[];
    message: string;
  }[];
}>;
