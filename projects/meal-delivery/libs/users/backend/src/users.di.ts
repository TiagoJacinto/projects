import { InMemoryUserRepository } from './repositories';
import { container } from 'tsyringe';

container.register('UserRepository', InMemoryUserRepository);
