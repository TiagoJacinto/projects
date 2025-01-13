import {
  type IDatabaseDriver,
  type Options,
  type EntityManagerType,
  type EntityManager,
  type Connection,
  type MikroORM,
} from '@mikro-orm/core';

import { type MikroORMClient } from '../../types';
import { BaseDatabase } from '../Database';

type Init<
  D extends IDatabaseDriver = IDatabaseDriver,
  EM extends EntityManager = D[typeof EntityManagerType] & EntityManager,
> = (options?: Options<D, EM>) => Promise<MikroORM<D, EM>>;

export class MikroORMDatabase<
  TDriver extends IDatabaseDriver,
  TEntityManager extends TDriver[typeof EntityManagerType] &
    EntityManager<IDatabaseDriver<Connection>>,
> extends BaseDatabase<MikroORMClient<TDriver, TEntityManager>> {
  private connection?: MikroORMClient<TDriver, TEntityManager>;

  constructor(private readonly init: Init<TDriver, TEntityManager>) {
    super();
  }

  override async connect(options?: Options<TDriver, TEntityManager>): Promise<void> {
    const connection = this.retrieveConnection();

    if (connection) {
      throw new Error('Database already connected');
    }

    await this.establishConnection(options);
  }

  protected async establishConnection(options?: Options<TDriver, TEntityManager>) {
    this.connection = await this.init(options);
  }

  protected retrieveConnection() {
    return this.connection;
  }
}
