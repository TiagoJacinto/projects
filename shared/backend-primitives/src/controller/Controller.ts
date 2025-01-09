import { type RequestHandler } from '../RequestHandler';

export type RequestContext = {
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
