import { Promisable } from 'type-fest';

type RequestContext = {
  req: unknown;
  res: unknown;
};

type NextFunction = (...args: unknown[]) => Promisable<void>;

abstract class RequestHandler<TContext extends RequestContext> {
  protected abstract executeImpl(
    ctx: TContext,
    next: NextFunction
  ): Promise<void>;

  protected abstract handleError(error: unknown): unknown;

  async execute(ctx: TContext, next: NextFunction): Promise<void> {
    await this.executeImpl(ctx, next).catch(this.handleError);

    await next();
  }
}

export abstract class Controller<
  TContext extends RequestContext
> extends RequestHandler<TContext> {
  protected abstract override executeImpl(ctx: TContext): Promise<void>;
}

export abstract class Middleware<
  TContext extends RequestContext,
  TNextFunction extends NextFunction
> extends RequestHandler<TContext> {
  protected abstract override executeImpl(
    ctx: TContext,
    next: TNextFunction
  ): Promise<void>;
}
