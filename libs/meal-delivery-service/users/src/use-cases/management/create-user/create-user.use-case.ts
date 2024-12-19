import { UseCase } from '@tiagojacinto/core-primitives';
import { CreateUserDTO } from './create-user.dto';
import { Nil, Result } from '@tiagojacinto/core-primitives';

type Response = Result<Nil, Nil>;

export class CreateUserUseCase implements UseCase<CreateUserDTO, Response> {
  execute(request: CreateUserDTO): Promise<Response> {
    throw new Error('Method not implemented.');
  }
}
