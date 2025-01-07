import { type PageRouter } from '../page-router/PageRouter';

export class AppController<TConfig extends Record<PropertyKey, unknown>> {
  constructor(
    private readonly router: PageRouter<keyof TConfig>,
    private readonly pageControllers: TConfig,
  ) {}

  getPageController<T extends keyof TConfig>(pageId: T) {
    this.router.navigate(pageId);

    return this.pageControllers[pageId];
  }
}
