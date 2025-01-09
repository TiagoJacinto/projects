import { type Promisable } from 'type-fest';

import { Controller, type RequestContext } from '../controller/Controller';

type NextFunction = (...args: unknown[]) => Promisable<void>;

export abstract class Middleware<
  TContext extends RequestContext & {
    next: NextFunction;
  },
> extends Controller<TContext> {
  protected abstract override executeImpl(ctx: TContext): Promise<void>;

  override async execute(ctx: TContext): Promise<void> {
    await super.execute(ctx);

    await ctx.next();
  }
}
