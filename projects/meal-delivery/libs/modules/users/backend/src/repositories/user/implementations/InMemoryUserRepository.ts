import { AsyncMaybe } from '@tiagojacinto/core-primitives';
import { UserRepository } from '../user.repository';
import { User, UserEmail } from '../../../domain';
import { DomainEvents, UniqueEntityID } from '@tiagojacinto/domain-primitives';
import { singleton } from 'tsyringe';

@singleton()
export class InMemoryUserRepository implements UserRepository {
  private readonly users: User[] = [];

  async findByEmail(email: UserEmail): AsyncMaybe<User> {
    return this.users.find((user) => user.email.equals(email));
  }

  async save(user: User): Promise<void> {
    this.users.push(user);

    DomainEvents.dispatchEventsForAggregateWithID(user.id);
  }

  async findById(id: UniqueEntityID): AsyncMaybe<User> {
    return this.users.find((user) => user.id.equals(id));
  }
}
