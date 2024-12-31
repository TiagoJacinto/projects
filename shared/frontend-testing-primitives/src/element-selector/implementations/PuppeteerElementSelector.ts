import { type Maybe } from '@tiagojacinto/core-primitives';
import { type WaitForSelectorOptions, type ElementHandle } from 'puppeteer';

import { type PuppeteerPageDriver } from '../../page-drivers/PuppeteerDriver';
import {
  type ElementDefinition,
  ElementSelector,
  type ElementSelectorConfig,
} from '../ElementSelector';

export class PuppeteerElementSelector<T extends ElementSelectorConfig> extends ElementSelector<
  ElementHandle<Element>,
  WaitForSelectorOptions,
  T
> {
  constructor(private readonly driver: PuppeteerPageDriver, config: T) {
    super(config);
  }

  protected override getElement(
    element: ElementDefinition,
    options?: WaitForSelectorOptions,
  ): Promise<Maybe<ElementHandle<Element>>> {
    return this.driver.page.waitForSelector(element.selector, options);
  }
}
