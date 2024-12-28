import { mergeDeepLeft } from 'ramda';

import { HTTPClient } from '../../HTTPClient';

type RequestConfig = RequestInit & { url: string };

export class FetchClient extends HTTPClient<RequestConfig> {
  constructor(private readonly baseURL: string) {
    super();
  }

  override get<TRequest extends Record<string, string>, TResponse>(
    url: string,
    params: TRequest,
  ): Promise<TResponse> {
    return this.request({
      url: url + new URLSearchParams(params).toString(),
      method: 'GET',
    });
  }

  override post<TRequest, TResponse>(url: string, body: TRequest): Promise<TResponse> {
    return this.request({
      url,
      method: 'POST',
      body: JSON.stringify(body),
    });
  }

  override put<TRequest, TResponse>(url: string, body: TRequest): Promise<TResponse> {
    return this.request({
      url,
      method: 'PUT',
      body: JSON.stringify(body),
    });
  }

  override delete<TResponse>(url: string): Promise<TResponse> {
    return this.request({
      url,
      method: 'DELETE',
    });
  }

  override async request<TResponse>(requestCfg: RequestConfig): Promise<TResponse> {
    const response = await fetch(
      `${this.baseURL}${requestCfg.url}`,
      mergeDeepLeft(
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
        requestCfg,
      ) as RequestInit,
    );

    return (await response.json()) as TResponse;
  }
}
