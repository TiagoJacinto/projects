import { type AsyncMaybe } from '@tiagojacinto/core-primitives';

import { type User, type UserEmail } from '../../domain';

export const UserRepository = Symbol('UserRepository');
export interface UserRepository {
  findByEmail(email: UserEmail): AsyncMaybe<User>;
  save(user: User): Promise<void>;
}
