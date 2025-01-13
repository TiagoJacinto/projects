import { type AsyncMaybe } from '@tiagojacinto/core-primitives';
import { MikroORMClient } from '@tiagojacinto/database-primitives';
import { UniqueEntityID } from '@tiagojacinto/domain-primitives';
import { inject, singleton } from 'tsyringe';

import { User, UserEmail, UserPassword } from '../../../domain';
import { UserEntity } from '../entities/user.entity';
import { type UserRepository } from '../user.repository';

@singleton()
export class MikroORMUserRepository implements UserRepository {
  constructor(@inject(MikroORMClient) private readonly client: MikroORMClient) {}

  async findByEmail(email: UserEmail): AsyncMaybe<User> {
    const user = await this.client.em.findOne(UserEntity, {
      email: email.value,
    });

    if (!user) return null;

    return toDomain(user);
  }

  async save(user: User) {
    await this.client.em.persistAndFlush(toPersistence(user));
  }
}

const toDomain = (model: UserEntity) =>
  User.create(
    {
      email: UserEmail.create(model.email),
      password: UserPassword.create({ value: model.password }),
    },
    new UniqueEntityID(model.id),
  );

const toPersistence = (user: User) =>
  new UserEntity({
    email: user.email.value,
    password: user.password.value,
  });
