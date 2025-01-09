export interface RequestHandler<TRequest> {
  execute(request: TRequest): Promise<void>;
}
