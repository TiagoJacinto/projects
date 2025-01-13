import { type Maybe } from '@tiagojacinto/core-primitives';

export interface Database<TConnection> {
  connect(): Promise<void>;
  getConnection(): TConnection;
}

export abstract class BaseDatabase<TConnection> implements Database<TConnection> {
  protected abstract establishConnection(): Promise<void>;
  protected abstract retrieveConnection(): Maybe<TConnection>;

  async connect() {
    const connection = this.retrieveConnection();

    if (connection) {
      throw new Error('Database already connected');
    }

    await this.establishConnection();
  }

  getConnection() {
    const connection = this.retrieveConnection();

    if (!connection) {
      throw new Error('Database not connected');
    }

    return connection;
  }
}
