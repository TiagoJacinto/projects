import { type Nil } from '@tiagojacinto/core-primitives';

export interface EndpointController<TRequest, TResponse> {
  execute(request: TRequest): Promise<TResponse>;
}

export abstract class BaseEndpointController<
  TRequest,
  TRequestHandlingErrorResponse,
  TResponse = Nil,
> implements EndpointController<TRequest, TResponse | TRequestHandlingErrorResponse>
{
  protected abstract executeImpl(request: TRequest): Promise<TResponse>;
  protected abstract getRequestHandlingErrorResponse(error: unknown): TRequestHandlingErrorResponse;

  async execute(request: TRequest) {
    try {
      return this.executeImpl(request);
    } catch (error) {
      return this.getRequestHandlingErrorResponse(error);
    }
  }
}
