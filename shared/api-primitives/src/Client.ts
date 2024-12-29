export interface Client<TRequest, TResponse> {
  request(request: TRequest): Promise<TResponse>;
}
