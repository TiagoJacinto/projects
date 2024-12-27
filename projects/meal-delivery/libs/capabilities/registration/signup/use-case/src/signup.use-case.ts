import { err, Nil, ok, Result, UseCase } from '@tiagojacinto/core-primitives';
import { SignupDTO } from '@tiagojacinto/meal-delivery-users-signup-contracts';
import {
  User,
  UserEmail,
  UserPassword,
  UserRepository,
} from '@tiagojacinto/meal-delivery-users-backend';
import { SignupErrors } from './signup.errors';
import { singleton, inject } from 'tsyringe';

type Response = Result<Nil, SignupErrors.EmailAlreadyExists>;

@singleton()
export class SignupUseCase implements UseCase<SignupDTO, Response> {
  constructor(@inject('UserRepository') private readonly userRepository: UserRepository) {}

  async execute(request: SignupDTO): Promise<Response> {
    const email = UserEmail.create(request.email);
    const password = UserPassword.create({ value: request.password });

    const userWithEmailAlreadyExists = Boolean(await this.userRepository.findByEmail(email));

    if (userWithEmailAlreadyExists) {
      return err(new SignupErrors.EmailAlreadyExists(email.value));
    }

    const user = User.create({
      email,
      password,
    });

    await this.userRepository.save(user);

    return ok(null);
  }
}
