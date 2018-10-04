// API https://github.com/GoogleChrome/puppeteer/blob/v1.8.0/docs/api.md#
const scope = require('./scope')
const selectors = require('./selectors')
const pages = require('./pages')
const { expect, assert } = require('chai');

exports.pageHasLoaded = async () => {
  // Write code here that turns the phrase above into concrete actions
  return scope.context.visit.status === 200;
}

exports.visitDrugPage = async () => {
  if (!scope.browser)
    scope.browser = await scope.driver.launch({headless: true, args:['--no-sandbox']});
  scope.context.currentPage = await scope.browser.newPage();
  scope.context.currentPage.setViewport({ width: 1280, height: 1024 });
  const url = scope.host + pages.drugPage('cocaine');
  scope.context.visit = await scope.context.currentPage.goto(url, {
    waitUntil: 'networkidle2'
  });
  return scope.context.visit;
}

exports.visitDrugPageByClickingSlangTermOnAZ = async () => {
  if (!scope.browser)
    scope.browser = await scope.driver.launch({headless: true, args:['--no-sandbox']});
  scope.context.currentPage = await scope.browser.newPage();
  scope.context.currentPage.setViewport({ width: 1280, height: 1024 });

  const url = scope.host + pages.aToZ;
  await scope.context.currentPage.goto(url, {
    waitUntil: 'networkidle2'
  });

//   let link = await scope.context.currentPage.$x("//h3[contains(., 'Coke')]/..")
//   await link[0].click()
  clickByHeadingText(scope.context.currentPage, 'h3', 'Coke')
  await scope.context.currentPage.waitForNavigation({waitUntil: 'networkidle2'});
  scope.context.visit = scope.context.currentPage
  return scope.context.visit
}

exports.assertPageTitleEqualsLink = async () => {
  const innerText = await scope.context.currentPage.evaluate((selectors) => document.querySelector(selectors.elements['page-title']).innerText, selectors);
  assert.equal(innerText, 'Cocaine')
}

exports.assertSlagTermisHighlighted = async () => {
  const innerText = await scope.context.currentPage.evaluate((selectors) => document.querySelector(selectors.elements['drug-slang-terms']).innerText, selectors);
  expect(innerText).to.have.string('Coke')
}

const clickByHeadingText = async (page, heading, text) => {
  const linkHandlers = await page.$x(selectors.links.headingContains(heading, text));

  if (linkHandlers.length > 0) {
    await linkHandlers[0].click();
  } else {
    throw new Error(`Link not found: ${text}`);
  }
};

const clickByText = async (page, text) => {
  const escapedText = escapeXpathString(text);
  const linkHandlers = await page.$x(selectors.links.contains(escapedText));

  if (linkHandlers.length > 0) {
    await linkHandlers[0].click();
  } else {
    throw new Error(`Link not found: ${text}`);
  }
};

const escapeXpathString = str => {
  const splitedQuotes = str.replace(/'/g, `', "'", '`);
  return `concat('${splitedQuotes}', '')`;
};