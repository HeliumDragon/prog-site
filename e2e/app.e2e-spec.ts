import { ProgSitePage } from './app.po';

describe('prog-site App', function() {
  let page: ProgSitePage;

  beforeEach(() => {
    page = new ProgSitePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
