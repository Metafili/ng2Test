export class NewDemoPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('new-demo-app h1')).getText();
  }
}
