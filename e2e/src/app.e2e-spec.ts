import { Ng2RealApp } from './app.po';
import { browser } from 'protractor';

describe('ng-demo App', () => {
  let page: Ng2RealApp;

  beforeEach(() => {
    page = new Ng2RealApp();
  });

  it('should display message saying app works', async () => {
    await browser.waitForAngularEnabled(false);
    await page.navigateTo();
    expect(await page.getParagraphText()).toContain('conduit');
    await browser.waitForAngularEnabled(true);
  });
});
