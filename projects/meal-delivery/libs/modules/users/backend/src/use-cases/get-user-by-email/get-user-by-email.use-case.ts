import { err, ok, Result, UseCase, UseCaseError } from '@tiagojacinto/core-primitives';
import { User } from '../../domain/user.aggregate';
import { UserEmail } from '../../domain/user-email.value';
import { UserRepository } from '../../repositories';

export type GetUserByEmailDTO = {
  email: string;
};

export namespace GetUserByEmailErrors {
  export class UserNotFound extends UseCaseError {
    readonly email: string;

    constructor(email: string) {
      super();
      this.email = email;
    }
  }
}

type Response = Result<User, GetUserByEmailErrors.UserNotFound>;

export class GetUserByEmailUseCase implements UseCase<GetUserByEmailDTO, Response> {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(dto: GetUserByEmailDTO): Promise<Response> {
    const email = UserEmail.create(dto.email);

    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      return err(new GetUserByEmailErrors.UserNotFound(dto.email));
    }

    return ok(user);
  }
}
