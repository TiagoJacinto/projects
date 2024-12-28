import { type Promisable } from 'type-fest';

export abstract class ReactHookController<
  TContext,
  TMethod extends (...args: any[]) => Promisable<unknown>,
> {
  protected constructor(private readonly defineHooks: () => TContext) {}

  getHookedMethod() {
    return this.execute.bind(this, this.defineHooks());
  }

  protected abstract execute(context: TContext, ...args: Parameters<TMethod>): ReturnType<TMethod>;
}
