import axios, { type AxiosInstance, type AxiosRequestConfig } from 'axios';

import { HTTPClient } from '../../HTTPClient';
import { type URI } from '../../URI';

export class AxiosClient extends HTTPClient<AxiosRequestConfig> {
  private readonly http: AxiosInstance;

  constructor(baseURL: string) {
    super();
    this.http = axios.create({ baseURL });
  }

  get<TRequest, TResponse>(url: URI, params: TRequest): Promise<TResponse> {
    return this.request<TResponse>(url, {
      method: 'GET',
      params,
    });
  }

  post<TRequest, TResponse>(url: URI, body: TRequest): Promise<TResponse> {
    return this.request<TResponse>(url, {
      method: 'POST',
      data: body,
    });
  }

  put<TRequest, TResponse>(url: URI, body: TRequest): Promise<TResponse> {
    return this.request<TResponse>(url, {
      method: 'PUT',
      data: body,
    });
  }

  delete<TResponse>(url: URI): Promise<TResponse> {
    return this.request<TResponse>(url, {
      method: 'DELETE',
    });
  }

  async request<TResponse>(url: URI, requestCfg: AxiosRequestConfig): Promise<TResponse> {
    const response = await this.http.request<TResponse>({ url, ...requestCfg });

    return response.data;
  }
}
