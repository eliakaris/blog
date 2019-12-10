import { expect } from 'chai';
import { parse, join } from 'path';
import { config } from '../wdio.conf.js';
import { copySync } from 'fs-extra';

export function screenshotElement(referenceName: string, element: WebdriverIO.Element) {
  let m = module;
  let rootPath = ''
  while (m) {
    if (m.id.endsWith('.mocha.ts')) {
      rootPath = parse(m.id).base.replace('.mocha.ts', '');
      break;
    }
    m = m.parent;
  }

  const methodOptions = {
    actualFolder: join(process.cwd(), '.output/screenshots/screen', rootPath),
    baselineFolder: join(process.cwd(), 'src/screenshots', rootPath),
    diffFolder: join(process.cwd(), '.output/screenshots/diff', rootPath),
  };

  element.scrollIntoView();
  const checkResult = browser.checkElement(element, referenceName, methodOptions);

  if (process.env.UPDATE_BASELINES && checkResult.misMatchPercentage >= config.saveAboveTolerance) {
    console.log(`Updating baseline: ${checkResult.filename}`)
    copySync(checkResult.folders.actual, checkResult.folders.baseline);
  } else {
    expect(checkResult.misMatchPercentage).to.be.lessThan(config.saveAboveTolerance || 0);
  }
}
