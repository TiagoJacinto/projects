import { type Promisable } from 'type-fest';

interface RequestHandler<TRequest> {
  execute(request: TRequest): Promise<void>;
}

type RequestContext = {
  req: unknown;
  res: unknown;
};

export abstract class Controller<TContext extends RequestContext>
  implements RequestHandler<TContext>
{
  protected abstract executeImpl(ctx: TContext): Promise<void>;

  protected abstract handleError(error: unknown): unknown;

  async execute(ctx: TContext): Promise<void> {
    try {
      await this.executeImpl(ctx);
    } catch (error) {
      this.handleError(error);
    }
  }
}

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
