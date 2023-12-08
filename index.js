const core = require('@actions/core');

const mockResponse = {
    tokenUsages: 10,
    componentUsage: 12,

    // derivative data
    componentUsagesFromJsx: 10,
    componentUsagesFromHbs: 2,
    tokenUsagesFromScss: 6,
    tokenUsagesFromJsx: 4
}

// https://github.blog/2022-05-09-supercharging-github-actions-with-job-summaries/
// https://github.com/actions/toolkit/pull/1574/files
const generateMarkup = async (response) => {
    console.log('response data', response);
    await summary
     .addHeading('EDS Usage')
     .addTable(
        [
            [{data: 'Token', header: true}, {data: 'Component', header: true}],
            ['foo.js', 'Pass ✅']
            ['10', '8']
            [`${10}`, `${8}`]
            [response.tokenUsages, response.componentUsage]
            [`${response.tokenUsages}`, `${response.componentUsage}`]
        ]
     )
     .write();
}

try {
  generateMarkup(mockResponse);
} catch (error) {
  setFailed(error.message);
}