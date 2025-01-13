import { type ErrorResponse } from './ErrorResponse';

export type RequestHandlingErrorResponse = ErrorResponse<{
  name: 'RequestHandlingError';
}>;

export const requestHandlingErrorResponse: RequestHandlingErrorResponse = {
  error: {
    name: 'RequestHandlingError',
  },
};
