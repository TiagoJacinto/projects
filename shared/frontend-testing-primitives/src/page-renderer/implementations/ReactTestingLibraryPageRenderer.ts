import { render } from '@testing-library/react';

import { BasePageRenderer } from '../PageRenderer';

export class ReactTestingLibraryPageRenderer extends BasePageRenderer<React.ReactNode> {
  protected renderNode(node: React.ReactNode) {
    render(node);
  }
}
