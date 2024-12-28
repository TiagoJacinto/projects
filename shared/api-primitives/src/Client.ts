export interface Client<TRequestConfig> {
  request<TResponse>(request: TRequestConfig): Promise<TResponse>;
}
