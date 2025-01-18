import { type Promisable } from 'type-fest';

import { Controller } from '../controller/Controller';

type NextFunction = (...args: unknown[]) => Promisable<void>;

export abstract class Middleware<
  TContext extends {
    next: NextFunction;
  },
> extends Controller<TContext> {
  protected abstract override executeImpl(ctx: TContext): Promise<void>;

  override async execute(ctx: TContext): Promise<void> {
    await super.execute(ctx);

    await ctx.next();
  }
}
