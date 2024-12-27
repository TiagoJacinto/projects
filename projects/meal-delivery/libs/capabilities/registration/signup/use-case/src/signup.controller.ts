import { SignupUseCase } from './signup.use-case';
import { SignupErrors } from './signup.errors';
import { FastifyController } from '@tiagojacinto/framework-adapters';
import { FastifyReply, FastifyRequest } from 'fastify';
import { SignupDTO } from '@tiagojacinto/meal-delivery-users-signup-contracts';
import { singleton, inject } from 'tsyringe';

type RequestContext = {
  req: FastifyRequest<{ Body: SignupDTO }>;
  res: FastifyReply;
};

@singleton()
export class SignupController extends FastifyController<RequestContext> {
  constructor(@inject(SignupUseCase) private readonly useCase: SignupUseCase) {
    super();
  }

  protected async executeImpl(ctx: RequestContext): Promise<void> {
    const result = await this.useCase.execute(ctx.req.body);

    if (result.isOk()) return ctx.res.status(201).send();

    switch (true) {
      case result.error instanceof SignupErrors.EmailAlreadyExists:
        return ctx.res.status(409).send();
    }
  }
}
