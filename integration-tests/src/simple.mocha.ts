import { expect } from 'chai';
import { screenshotElement } from './utilities';

describe('test suite', () => {
  it('verifies header and footer', (done) => {
    browser.url('/');
    expect(browser.getTitle()).to.equal('Elia Karagiannis');
    screenshotElement('header', browser.$('header'));
    screenshotElement('footer', browser.$('footer .container'));
  });

  it('verifies navigating to the blog list', (done) => {
    browser.url('/');
    browser.$('nav .nav-item:nth-child(3)').click();
    screenshotElement('first-blog', browser.$('div[blog-slug="i-have-a-blog"]'));
    browser.$('div[blog-slug="i-have-a-blog"]').click();
    screenshotElement('first-blog-content', browser.$('article'));
  });
});
