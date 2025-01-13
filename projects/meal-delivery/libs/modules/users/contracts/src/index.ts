import {
  type APIResponse,
  BaseEndpointController,
  requestHandlingErrorResponse,
  type RequestHandlingErrorResponse,
} from '@tiagojacinto/api-primitives';
import { type Nil } from '@tiagojacinto/core-primitives';

export abstract class UsersEndpointController<
  TRequest,
  TResponse = Nil,
> extends BaseEndpointController<TRequest, RequestHandlingErrorResponse, APIResponse<TResponse>> {
  protected getRequestHandlingErrorResponse() {
    return requestHandlingErrorResponse;
  }
}
