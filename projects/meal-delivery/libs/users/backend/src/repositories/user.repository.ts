import { AsyncMaybe } from '@tiagojacinto/core-primitives';
import { UserEmail } from '../domain/user-email.value';
import { User } from '../domain/user.aggregate';

export interface UserRepository {
  findByEmail(email: UserEmail): AsyncMaybe<User>;
  save(user: User): Promise<void>;
}
