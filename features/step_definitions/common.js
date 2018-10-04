// Dependencies
const { Given, When, Then } = require('cucumber');
const {
  visitDrugPage,
  visitDrugPageByClickingSlangTermOnAZ,
  pageHasLoaded,
  assertPageTitleEqualsLink,
  assertSlagTermisHighlighted
} = require('../support/actions');

Given('that I have linked through to a drugs page', visitDrugPage);

Given('I have come to this page by clicking on or searching for a slang name', visitDrugPageByClickingSlangTermOnAZ);

When(/^the page (has|is) loaded$/, (value) => {
  return pageHasLoaded();
});

Then('I should see the name of the drug this page represents as the page title', assertPageTitleEqualsLink);

Then('I should be able to see the slang name highlighted', assertSlagTermisHighlighted);

