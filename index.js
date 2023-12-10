const core = require('@actions/core');

// const exampleResponse = {
//     tokenUsages: 10,
//     componentUsage: 12,

//     // derivative data
//     componentUsagesFromJsx: 10,
//     componentUsagesFromHbs: 2,
//     tokenUsagesFromScss: 6,
//     tokenUsagesFromJsx: 4
// }

const { getInput, summary } = core;

// https://github.blog/2022-05-09-supercharging-github-actions-with-job-summaries/
// https://github.com/actions/toolkit/pull/1574/files
const generateMarkup = async (tokenUsage, componentUsage) => {
    await summary
     .addHeading('✨ EDS Usage ✨')
     .addRaw('Some content here :speech_balloon:', true)
     .addTable(
        [
            [{data: 'Token', header: true}, {data: 'Component', header: true}],
            [`${tokenUsage}`, `${componentUsage}`]
        ]
     )
     .write();
}

try {
  const tokens = getInput('tokens');
  const components = getInput('components');
  console.log('tokens', tokens);
  console.log('components', components);

  const currentCount = JSON.parse(getInput('currentCount') || `{}`);
  console.log('currentCount', currentCount);

  generateMarkup(tokens, components);
} catch (error) {
  setFailed(error.message);
}