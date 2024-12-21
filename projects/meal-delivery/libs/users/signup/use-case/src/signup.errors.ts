import { UseCaseError } from '@tiagojacinto/core-primitives';

export namespace SignupErrors {
  export class EmailAlreadyExists extends UseCaseError {
    readonly email: string;

    constructor(email: string) {
      super();
      this.email = email;
    }
  }
}
