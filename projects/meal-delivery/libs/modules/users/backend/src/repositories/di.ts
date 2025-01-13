import { container, instanceCachingFactory } from 'tsyringe';

import { type Config } from '../Config';
import { InMemoryUserRepository, UserRepository } from './user';
import { MikroORMUserRepository } from './user/implementations/MikroORMUserRepository';

export function registerRepositories(config: Config) {
  container.register(UserRepository, {
    useFactory: instanceCachingFactory<UserRepository>((c) => {
      return config.env === 'development'
        ? c.resolve(InMemoryUserRepository)
        : c.resolve(MikroORMUserRepository);
    }),
  });
}
