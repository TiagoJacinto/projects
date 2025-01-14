import * as request from 'supertest';
import { type App } from 'supertest/types';

type Data = string | object | undefined;

export interface RestfulApiDriverResponse<T> extends request.Response {
  body: T;
}

export class SupertestDriver {
  constructor(private readonly http: App) {}

  get<T>(url: string) {
    return this.configureRequest<T>(request(this.http).get(url));
  }

  post<T>(url: string, data: Data) {
    return this.configureRequest<T>(request(this.http).post(url).send(data));
  }

  put<T>(url: string, data: Data) {
    return this.configureRequest<T>(request(this.http).put(url).send(data));
  }

  patch<T>(url: string, data: Data) {
    return this.configureRequest<T>(request(this.http).patch(url).send(data));
  }

  delete<T>(url: string) {
    return this.configureRequest<T>(request(this.http).delete(url));
  }

  private configureRequest<T>(req: request.Request) {
    return req.set('Accept', 'application/json') as Promise<RestfulApiDriverResponse<T>>;
  }
}
