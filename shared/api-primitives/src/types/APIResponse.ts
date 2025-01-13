import { type ApiErrorResponse } from './ApiErrorResponse';
import { type SuccessResponse } from './SuccessResponse';
import { type ValidationErrorResponse } from './ValidationErrorResponse';

export type APIResponse<T> = SuccessResponse<T> | ValidationErrorResponse | ApiErrorResponse;
