import { Controller } from '@tiagojacinto/backend-primitives';
import { FastifyReply, FastifyRequest } from 'fastify';

type RequestContext = {
  req: FastifyRequest;
  res: FastifyReply;
};

export abstract class FastifyController<
  T extends RequestContext
> extends Controller<T> {
  protected handleError(error: unknown): never {
    throw error;
  }
}