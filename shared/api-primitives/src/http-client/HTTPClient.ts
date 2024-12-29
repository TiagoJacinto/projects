import { type Client } from '../Client';

export interface HTTPClient<TRequest, TResponse> extends Client<TRequest, TResponse> {
  get(url: string, params: Record<string, string>, requestCfg?: TRequest): Promise<TResponse>;

  post(url: string, body: unknown, requestCfg?: TRequest): Promise<TResponse>;

  put(url: string, body: unknown, requestCfg?: TRequest): Promise<TResponse>;

  delete(url: string, requestCfg?: TRequest): Promise<TResponse>;
}
