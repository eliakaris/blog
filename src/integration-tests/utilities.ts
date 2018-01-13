import { expect } from 'chai';

export function screenshotElement(referenceName: string, element: WebdriverIO.RawResult<WebdriverIO.Element>) {
  const results = browser.checkElement(element.selector, { elementReferenceName: referenceName });
  for (let i = 0; i < results.length; i++) {
    expect(results[i].isWithinMisMatchTolerance).to.equal(true);
  }
}
