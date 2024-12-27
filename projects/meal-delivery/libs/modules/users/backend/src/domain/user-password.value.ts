import { ValueObject } from '@tiagojacinto/domain-primitives';

type UserPasswordProps = {
  value: string;
};

export class UserPassword extends ValueObject<UserPasswordProps> {
  get value() {
    return this.props.value;
  }

  static create(props: UserPasswordProps) {
    return new UserPassword(props);
  }
}
