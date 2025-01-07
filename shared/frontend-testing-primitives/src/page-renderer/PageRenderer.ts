export interface PageRenderer<T> {
  render(node: T): void;
}

export abstract class BasePageRenderer<T> implements PageRenderer<T> {
  render(node: T) {
    try {
      this.renderNode(node);
    } catch (error) {
      throw new Error(`Error rendering page: ${String(error)}`);
    }
  }

  protected abstract renderNode(node: T): void;
}
