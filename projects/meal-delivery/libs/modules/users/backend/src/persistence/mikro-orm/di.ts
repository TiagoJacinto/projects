import { MikroORMClient, MikroORMPostgresDatabase } from '@tiagojacinto/database-primitives';
import { container } from 'tsyringe';

import config from './config';

export async function registerMikroORMClient() {
  const database = new MikroORMPostgresDatabase();

  await database.connect(config);

  container.registerInstance(MikroORMClient, database.getConnection());
}
