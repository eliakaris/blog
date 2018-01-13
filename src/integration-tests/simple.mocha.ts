import { expect } from 'chai';
import { screenshotElement } from './utilities';

describe('test suite', () => {
  it('verifies header', (done) => {
    browser.url('/');
    expect(browser.getTitle()).to.equal('Elia Karagiannis');
    screenshotElement('header', browser.$('.masthead'));
  });
});
