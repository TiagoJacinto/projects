import axios, {
  type AxiosResponse,
  type CreateAxiosDefaults,
  type AxiosInstance,
  type AxiosRequestConfig,
} from 'axios';

import { type HTTPClient } from '../../HTTPClient';

export class AxiosClient implements HTTPClient<AxiosRequestConfig, AxiosResponse> {
  private readonly http: AxiosInstance;

  constructor(config: CreateAxiosDefaults) {
    this.http = axios.create(config);
  }

  get<T>(url: string, params: Record<string, string>, requestCfg?: AxiosRequestConfig) {
    return this.request<T>({ ...requestCfg, url, method: 'GET', params });
  }

  post<T>(url: string, body: unknown, requestCfg?: AxiosRequestConfig) {
    return this.request<T>({ ...requestCfg, url, method: 'POST', data: body });
  }

  put<T>(url: string, body: unknown, requestCfg?: AxiosRequestConfig) {
    return this.request<T>({ ...requestCfg, url, method: 'PUT', data: body });
  }

  delete<T>(url: string, requestCfg?: AxiosRequestConfig) {
    return this.request<T>({ ...requestCfg, url, method: 'DELETE' });
  }

  request<T>(request: AxiosRequestConfig) {
    return this.http.request<T>(request);
  }
}
