const core = require('@actions/core');

// const exampleResponse = {
//     tokenUsages: 10,
//     componentUsages: 12,

//     // derivative data
//     componentUsagesFromJsx: 10,
//     componentUsagesFromHbs: 2,
//     tokenUsagesFromScss: 6,
//     tokenUsagesFromJsx: 4
// }

const { getInput, summary } = core;

// https://github.blog/2022-05-09-supercharging-github-actions-with-job-summaries/
// https://github.com/actions/toolkit/pull/1574/files
const generateMarkup = async (data) => {
  const {
    tokenUsages = 0,
    componentUsages = 0,
    componentUsagesFromJsx = 0,
    componentUsagesFromHbs = 0,
    tokenUsagesFromScss = 0,
    tokenUsagesFromJsx = 0,
  } = data;

  await summary
    .addHeading('✨ EDS Usage ✨')
    .addRaw('Helpful information about this chart and why would want to use it: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.', true)
    .addBreak()
    .addTable(
      [
          [{data: 'Token', header: true}, {data: 'Component', header: true}],
          [`${tokenUsages}`, `${componentUsages}`]
      ]
    )
    .addHeading('Token Breakdown', '2')
    .addRaw('Tokens can be utilized in scoped globally or at the component level. The following table summarizes complete token usage.')
    .addBreak()
    .addTable(
      [
        [{data: 'Global', header: true}, {data: 'Component', header: true},  {data: 'Total', header: true}],
        [`${tokenUsagesFromScss}`, `${tokenUsagesFromJsx}`, `${tokenUsages}`]
      ]
    )
    .addHeading('Component Breakdown', '2')
    .addRaw('Design System Components can be found in Ember Templates or in React. This table breaks down the component usage across the code base.')
    .addBreak()
    .addTable(
      [
        [{data: 'React', header: true}, {data: 'Ember', header: true},  {data: 'Total', header: true}],
        [`${componentUsagesFromJsx}`, `${componentUsagesFromHbs}`, `${componentUsages}`]
      ]
    )
    .write();
}

try {
  console.log('currentCount - raw format', getInput('currentCount'));
  const currentCount = JSON.parse(getInput('currentCount') || `{}`);
  console.log('currentCount - post parse', currentCount);

  generateMarkup(currentCount);
} catch (error) {
  core.setFailed(error.message);
}