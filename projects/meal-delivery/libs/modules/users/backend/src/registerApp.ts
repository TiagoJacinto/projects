import 'reflect-metadata';

import { type Config } from './Config';
import { registerMikroORMClient } from './persistence/mikro-orm/di';
import { registerRepositories } from './repositories/di';

export async function registerApp(config: Config) {
  if (config.env !== 'development') {
    await registerMikroORMClient();
  }

  registerRepositories(config);
}
