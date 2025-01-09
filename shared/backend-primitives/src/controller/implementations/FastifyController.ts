import { type FastifyReply, type FastifyRequest } from 'fastify';

import { Controller } from '../Controller';

type RequestContext = {
  req: FastifyRequest;
  res: FastifyReply;
};

export abstract class FastifyController<T extends RequestContext> extends Controller<T> {
  protected handleError(error: unknown): never {
    throw error;
  }
}
