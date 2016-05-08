import { NewDemoPage } from './app.po';

describe('new-demo App', function() {
  let page: NewDemoPage;

  beforeEach(() => {
    page = new NewDemoPage();
  })

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('new-demo works!');
  });
});
