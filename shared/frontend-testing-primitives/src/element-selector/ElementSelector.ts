import { type NonEmptyObject } from 'type-fest';

export interface ElementSelector<TElementKey, TElement> {
  get(key: TElementKey): Promise<TElement>;
}

export abstract class BaseElementSelector<TElementKey, TElement>
  implements ElementSelector<TElementKey, TElement>
{
  async get(key: TElementKey) {
    let element: TElement;

    try {
      element = await this.getElement(key);
    } catch (_) {
      throw new Error(`Error getting element ${key as string}!`);
    }

    return element;
  }

  protected abstract getElement(key: TElementKey): Promise<TElement>;
}

// export type ElementSelectorConfig<
//   TElementKey extends PropertyKey,
//   TLocatorName extends PropertyKey,
//   TMatcher,
// > = Record<TElementKey, NonEmptyObject<Partial<Record<TLocatorName, TMatcher>>>>;

// export class ConfiguredElementSelector<
//   TElementKey extends PropertyKey,
//   TLocatorName extends PropertyKey,
//   TElement,
//   TMatcher,
// > extends BaseElementSelector<TElementKey, TElement> {
//   constructor(private readonly config: ElementSelectorConfig<TElementKey, TLocatorName, TMatcher>) {
//     super();
//   }

//   protected getElement(key: TElementKey): Promise<TElement> {
//     throw new Error('Method not implemented.');
//   }
// }
