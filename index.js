const core = require('@actions/core');
const github = require('@actions/github');

const mockResponse = {
    tokenUsages: 10,
    componentUsage: 12,

    // derivative data
    componentUsagesFromJsx: 10,
    componentUsagesFromHbs: 2,
    tokenUsagesFromScss: 6,
    tokenUsagesFromJsx: 4
}

const generateMarkup = async (response) => {
    const { summary } = core;
    await summary
     .addHeading('EDS Usage')
     .addTable(
        [
            [{data: 'Token', header: true}, {data: 'Component', header: true}],
            [response.tokenUsages, response.componentUsage],
        ]
     )
     .write();
}

try {
/*---------example code------------*/
//   // `who-to-greet` input defined in action metadata file
//   const nameToGreet = core.getInput('who-to-greet');
//   console.log(`Hello ${nameToGreet}!`);

//   const time = (new Date()).toTimeString();
//   core.setOutput("time", time);

  // Get the JSON webhook payload for the event that triggered the workflow
  const payload = JSON.stringify(github.context.payload, undefined, 2)
  console.log(`The event payload: ${payload}`);
/*------------------------------------*/
  console.log('example data', mockResponse);

  // https://github.blog/2022-05-09-supercharging-github-actions-with-job-summaries/
  // https://github.com/actions/toolkit/pull/1574/files

    generateMarkup(mockResponse);
} catch (error) {
  core.setFailed(error.message);
}