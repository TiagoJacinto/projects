export abstract class Endpoint<TRequest, TResponse, TRequestHandlingErrorResponse> {
  protected abstract readonly requestHandlingErrorResponse: TRequestHandlingErrorResponse;

  protected abstract executeImpl(
    request: TRequest,
  ): Promise<TResponse | TRequestHandlingErrorResponse>;

  async execute(request: TRequest) {
    try {
      return this.executeImpl(request);
    } catch (_) {
      return this.requestHandlingErrorResponse;
    }
  }
}
