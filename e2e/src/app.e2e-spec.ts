import { Ng2RealApp } from './app.po';

describe('ng-demo App', () => {
  let page: Ng2RealApp;

  beforeEach(() => {
    page = new Ng2RealApp();
  });

  it('should display message saying app works', async () => {
    await page.navigateTo();
    expect(await page.getParagraphText()).toContain('conduit');
  });
});
