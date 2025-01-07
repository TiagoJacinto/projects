import { type SelectorMatcherOptions } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { type ArrayTail } from 'type-fest';

import {
  type SelectorType,
  type ReactTestingLibraryDriver,
} from '../../page-drivers/ReactTestingLibraryDriver';
import { type ElementSelector } from '../ElementSelector';

export type UserEventsWithBoundedElements<
  TElementEventMap extends Record<string, (...args: any) => unknown>,
> = {
  [K in keyof TElementEventMap]: (
    ...args: ArrayTail<Parameters<TElementEventMap[K]>>
  ) => ReturnType<TElementEventMap[K]>;
};

export type TestingLibraryElementUserEvents = Pick<
  typeof userEvent,
  | 'clear'
  | 'click'
  | 'dblClick'
  | 'deselectOptions'
  | 'hover'
  | 'selectOptions'
  | 'tripleClick'
  | 'type'
  | 'unhover'
  | 'upload'
>;

export type TestingLibraryDOMElementHandle =
  UserEventsWithBoundedElements<TestingLibraryElementUserEvents>;

type GetOptions = Partial<{
  async: boolean;
}>;

export class ReactTestingLibraryElementSelector<
  TSelectorConfig extends Record<string, { type: SelectorType; value: string }>,
  TElement extends TestingLibraryDOMElementHandle,
> implements ElementSelector<keyof TSelectorConfig, TElement>
{
  constructor(
    private readonly config: TSelectorConfig,
    private readonly driver: ReactTestingLibraryDriver,
  ) {}

  async get(key: keyof TSelectorConfig, options?: GetOptions & SelectorMatcherOptions) {
    const selector = this.config[key];

    const query = this.driver.screen[options?.async ? 'waitFor' : 'getBy'][selector.type];

    let element: TElement;

    try {
      const htmlElement = await query(selector.value, options);

      element = {
        clear: userEvent.clear.bind(null, htmlElement),
        click: userEvent.click.bind(null, htmlElement),
        dblClick: userEvent.dblClick.bind(null, htmlElement),
        deselectOptions: userEvent.deselectOptions.bind(null, htmlElement),
        hover: userEvent.hover.bind(null, htmlElement),
        selectOptions: userEvent.selectOptions.bind(null, htmlElement),
        tripleClick: userEvent.tripleClick.bind(null, htmlElement),
        type: userEvent.type.bind(null, htmlElement),
        unhover: userEvent.unhover.bind(null, htmlElement),
        upload: userEvent.upload.bind(null, htmlElement),
      } as TElement;
    } catch (_) {
      throw new Error(`Error getting element ${key as string}!`);
    }

    return element;
  }
}
