const selectors = {
  links: {
    contains: escapedText => {
      return `//a[contains(text(), ${escapedText})]`
    },
    headingContains: (heading, escapedText) => {
      return `//${heading}[contains(., '${escapedText}')]/..`

    }
  },
  elements: {
    'page-title': 'h1',
    'drug-slang-terms': 'p.lead'
  },
  buttons: {},
  checkboxes: {}
};

module.exports = selectors;