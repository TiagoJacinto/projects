import { type Matcher, screen, type SelectorMatcherOptions } from '@testing-library/react';

import { type AttributeSelectorType } from '../AttributeSelectorType';

export type SelectorType = AttributeSelectorType;

type Screen = {
  getBy: Record<
    SelectorType,
    <T extends HTMLElement>(id: Matcher, options?: SelectorMatcherOptions) => T
  >;
  waitFor: Record<
    SelectorType,
    <T extends HTMLElement>(id: Matcher, options?: SelectorMatcherOptions) => Promise<T>
  >;
};

export class ReactTestingLibraryDriver {
  public readonly screen: Screen = {
    getBy: {
      text: (id: Matcher, options?: SelectorMatcherOptions) => screen.getByText(id, options),
      label: (id: Matcher, options?: SelectorMatcherOptions) => screen.getByLabelText(id, options),
      placeholder: (id: Matcher, options?: SelectorMatcherOptions) =>
        screen.getByPlaceholderText(id, options),
      testId: (id: Matcher, options?: SelectorMatcherOptions) => screen.getByTestId(id, options),
    },
    waitFor: {
      text: (id: Matcher, options?: SelectorMatcherOptions) => screen.findByText(id, options),
      label: (id: Matcher, options?: SelectorMatcherOptions) => screen.findByLabelText(id, options),
      placeholder: (id: Matcher, options?: SelectorMatcherOptions) =>
        screen.findByPlaceholderText(id, options),
      testId: (id: Matcher, options?: SelectorMatcherOptions) => screen.findByTestId(id, options),
    },
  };
}
