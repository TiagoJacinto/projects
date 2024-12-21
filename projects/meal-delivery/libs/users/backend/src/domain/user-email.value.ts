import { ValueObject } from '@tiagojacinto/domain-primitives';

type UserEmailProps = {
  value: string;
};

export class UserEmail extends ValueObject<UserEmailProps> {
  get value() {
    return this.props.value;
  }

  static create(email: string) {
    return new UserEmail({ value: email });
  }
}
