import { MikroORM } from '@mikro-orm/postgresql';
import { MikroORMClient, MikroORMDatabase } from '@tiagojacinto/database-primitives';
import { container } from 'tsyringe';

import config from './config';

export async function registerMikroORMClient() {
  const database = new MikroORMDatabase(MikroORM.init);

  await database.connect(config);

  container.registerInstance(MikroORMClient, database.getConnection());
}
