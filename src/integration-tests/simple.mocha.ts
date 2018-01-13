import { expect } from 'chai';
import { screenshotElement } from './utilities';

describe('test suite', () => {
  it('verifies header and footer', (done) => {
    browser.url('/');
    expect(browser.getTitle()).to.equal('Elia Karagiannis');
    screenshotElement('header', browser.element('header'));
    screenshotElement('footer', browser.element('footer .container'));
  });

  it('verifies navigating to the blog list', (done) => {
    browser.url('/');
    browser.element('nav .nav-item:nth-child(3)').click();
    screenshotElement('first-blog', browser.element('div[blog-slug="i-have-a-blog"]'));
    browser.element('div[blog-slug="i-have-a-blog"] a[href="/blog/i-have-a-blog"]').click();
    screenshotElement('first-blog-content', browser.element('article'));
  });
});
