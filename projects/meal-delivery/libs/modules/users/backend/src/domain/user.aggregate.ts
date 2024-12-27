import { AggregateRoot, UniqueEntityID } from '@tiagojacinto/domain-primitives';
import { UserEmail } from './user-email.value';
import { UserPassword } from './user-password.value';
import { UserCreatedEvent } from './events/user-created.event';

type UserProps = {
  email: UserEmail;
  password: UserPassword;
};

export class User extends AggregateRoot<UserProps> {
  get email() {
    return this.props.email;
  }

  get password() {
    return this.props.password;
  }

  static create(props: UserProps, id?: UniqueEntityID) {
    const user = new User(props, id);

    const isNewUser = !id;

    if (isNewUser) {
      user.addDomainEvent(new UserCreatedEvent(user));
    }

    return user;
  }
}
