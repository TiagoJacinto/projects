import {
  type EntityManagerType,
  type Connection,
  type EntityManager,
  type IDatabaseDriver,
  type MikroORM,
} from '@mikro-orm/core';

export const MikroORMClient = Symbol('MikroORMClient');
export type MikroORMClient<
  D extends IDatabaseDriver = IDatabaseDriver<Connection>,
  EM extends EntityManager = D[typeof EntityManagerType] &
    EntityManager<IDatabaseDriver<Connection>>,
> = MikroORM<D, EM>;
