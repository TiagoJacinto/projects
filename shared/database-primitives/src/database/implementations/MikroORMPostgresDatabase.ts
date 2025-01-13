import {
  type IDatabaseDriver,
  type EntityManager,
  type Connection,
  type Options,
} from '@mikro-orm/core';
import {
  MikroORM as PgMikroORM,
  type PostgreSqlDriver,
  type SqlEntityManager,
} from '@mikro-orm/postgresql';

import { type MikroORMClient } from '../../types';
import { type Database } from '../Database';

export type MikroORMPostgresClient = MikroORMClient<
  PostgreSqlDriver,
  SqlEntityManager<PostgreSqlDriver> & EntityManager<IDatabaseDriver<Connection>>
>;

export class MikroORMPostgresDatabase implements Database<MikroORMPostgresClient> {
  private connection?: MikroORMPostgresClient;

  async connect(
    options?: Options<
      PostgreSqlDriver,
      SqlEntityManager<PostgreSqlDriver> & EntityManager<IDatabaseDriver<Connection>>
    >,
  ) {
    if (this.connection) {
      throw new Error('Database already connected');
    }

    this.connection = await PgMikroORM.init(options);
  }

  getConnection() {
    if (!this.connection) {
      throw new Error('Database not connected');
    }

    return this.connection;
  }
}
