import { type Maybe } from '@tiagojacinto/core-primitives';

type HTMLElementTagNameSelector = keyof HTMLElementTagNameMap;
type HTMLAllElementsSelector = '*';
type HTMLElementIdSelector = `#${string}`;
type HTMLElementClassSelector = `.${string}`;

type CSSSelector =
  | HTMLElementTagNameSelector
  | HTMLElementIdSelector
  | HTMLElementClassSelector
  | HTMLAllElementsSelector;

type ElementType = 'input' | 'button' | 'div' | 'checkbox';

export type ElementDefinition = { selector: CSSSelector; type: ElementType };

export type ElementSelectorConfig = Record<string, ElementDefinition>;

export abstract class ElementSelector<TElement, TConfig extends ElementSelectorConfig> {
  constructor(private readonly config: TConfig) {}

  async get(nameKey: keyof TConfig, timeout?: number) {
    const elementDefinition = this.config[nameKey];
    let element: TElement | null | undefined;

    try {
      element = await this.getElement(elementDefinition, timeout);
    } catch (_) {
      console.log('Element not found');
      throw new Error(`Element ${nameKey as string} not found!`);
    }

    if (!element) {
      throw new Error(
        `Could not load element's element ${nameKey as string}: maybe it's not on the page yet.`,
      );
    }

    return element;
  }

  protected abstract getElement(
    element: ElementDefinition,
    ...options: any[]
  ): Promise<Maybe<TElement>>;
}
