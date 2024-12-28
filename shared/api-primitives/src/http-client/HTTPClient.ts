import { type Client } from './Client';

export abstract class HTTPClient<TClientRequestConfig> implements Client<TClientRequestConfig> {
  abstract get<TRequest extends Record<string, string>, TResponse>(
    url: string,
    params: TRequest,
  ): Promise<TResponse>;

  abstract post<TRequest, TResponse>(url: string, body: TRequest): Promise<TResponse>;

  abstract put<TRequest, TResponse>(url: string, body: TRequest): Promise<TResponse>;

  abstract delete<TResponse>(url: string): Promise<TResponse>;

  abstract request<TResponse>(requestCfg: TClientRequestConfig): Promise<TResponse>;
}
