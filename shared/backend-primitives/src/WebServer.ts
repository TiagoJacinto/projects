import { killPortProcess } from 'kill-port-process';

export interface WebServer {
  start(): Promise<void>;
  stop(): Promise<void>;
}

export abstract class HTTPWebServer implements WebServer {
  async start() {
    await killPortProcess(this.getPort());

    await this.listen();
  }

  protected abstract listen(): Promise<void>;
  public abstract stop(): Promise<void>;
  protected abstract getPort(): number;
}
