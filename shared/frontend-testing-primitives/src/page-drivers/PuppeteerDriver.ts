import 'pptr-testing-library/extend';
import puppeteer, {
  type ElementHandle,
  type Browser,
  type LaunchOptions,
  type Page,
} from 'puppeteer';

export class PuppeteerPageDriver {
  private constructor(
    public readonly browser: Browser,
    public readonly page: Page,
    public readonly document: ElementHandle,
  ) {}

  static async create(options?: LaunchOptions) {
    const browserInstance = await puppeteer.launch(options);
    const page = await browserInstance.newPage();
    const document = await page.getDocument();
    return new PuppeteerPageDriver(browserInstance, page, document);
  }
}
