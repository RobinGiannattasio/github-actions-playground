const core = require('@actions/core');

const exampleResponse = {
    tokenUsages: 10,
    componentUsage: 12,

    // derivative data
    componentUsagesFromJsx: 10,
    componentUsagesFromHbs: 2,
    tokenUsagesFromScss: 6,
    tokenUsagesFromJsx: 4
}

const { getInput, summary } = core;

// https://github.blog/2022-05-09-supercharging-github-actions-with-job-summaries/
// https://github.com/actions/toolkit/pull/1574/files
const generateMarkup = async (numTokens, numComponents) => {
    await summary
     .addHeading('✨ EDS Usage ✨')
     .addRaw('Some content here :speech_balloon:', true)
     .addTable(
        [
            [{data: 'Token', header: true}, {data: 'Component', header: true}],
            [`${numTokens}`, `${numComponents}`]
        ]
     )
     .write();
}

try {
  const currentCount = JSON.parse(getInput('currentCount') || `{}`);
  const { tokenUsages = 0, componentUsage = 0 } = currentCount;
  console.log('currentCount', currentCount);

  generateMarkup(tokenUsages, componentUsage);
} catch (error) {
  setFailed(error.message);
}