import { browser, element, by } from 'protractor';

export class Ng2RealApp {
  async navigateTo() {
    return browser.get('/angular-realworld-example-app/');
  }

  async getParagraphText() {
    return element(by.css('.logo-font')).getText();
  }
}
