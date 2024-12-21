import { AsyncMaybe } from '@tiagojacinto/core-primitives';
import { User, UserEmail } from '../../domain';

export interface UserRepository {
  findByEmail(email: UserEmail): AsyncMaybe<User>;
  save(user: User): Promise<void>;
}
