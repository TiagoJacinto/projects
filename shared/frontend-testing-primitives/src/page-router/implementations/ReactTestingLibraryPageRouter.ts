import { type ReactTestingLibraryPageRenderer } from '../../page-renderer/implementations/ReactTestingLibraryPageRenderer';
import { type PageRouter } from '../PageRouter';

export class ReactTestingLibraryPageRouter<
  TElement extends React.ReactNode,
  TPageId extends PropertyKey,
> implements PageRouter<TPageId>
{
  constructor(
    private readonly pages: Record<TPageId, TElement>,
    private readonly renderer: ReactTestingLibraryPageRenderer,
  ) {}

  navigate(pageId: TPageId): void {
    this.renderer.render(this.pages[pageId]);
  }
}
