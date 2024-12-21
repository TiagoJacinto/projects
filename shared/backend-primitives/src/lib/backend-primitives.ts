import { Promisable } from 'type-fest';

type NextFunction = (...args: unknown[]) => Promisable<void>;

type RequestContext = {
  req: unknown;
  res: unknown;
  next?: NextFunction;
};

abstract class RequestHandler<TContext extends RequestContext> {
  protected abstract executeImpl(ctx: TContext): Promise<void>;

  protected abstract handleError(error: unknown): unknown;

  async execute(ctx: TContext): Promise<void> {
    await this.executeImpl(ctx).catch(this.handleError);

    await ctx.next?.();
  }
}

export abstract class Controller<
  TContext extends Omit<RequestContext, 'next'>
> extends RequestHandler<TContext> {
  protected abstract override executeImpl(ctx: TContext): Promise<void>;
}

export abstract class Middleware<
  TContext extends Required<RequestContext>
> extends RequestHandler<TContext> {
  protected abstract override executeImpl(ctx: TContext): Promise<void>;
}
