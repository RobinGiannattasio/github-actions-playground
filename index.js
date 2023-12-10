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

const getStatusMessage = (current, prev) => {
  // Assume increase means good, status quo means fine, and decrease is bad
  const result = current - prev;
  if (result > 0) return '🟢';
  if (result < 0) return '🟠';
  return '⚪️'
};

const getChangeMessage = (current, prev) => {
  return `${current - prev}${current > prev ? '🔥' : ''}`
}

const generateMarkup = async (current, prev) => {
  const {
    tokenUsages = 0,
    componentUsages = 0,
    componentUsagesFromJsx = 0,
    componentUsagesFromHbs = 0,
    tokenUsagesFromScss = 0,
    tokenUsagesFromJsx = 0,
  } = current;

  const {
    tokenUsages: prevTokenUsages = 0,
    componentUsages: prevComponentUsages = 0,
    // componentUsagesFromJsx: prevComponentUsagesFromJsx = 0,
    // componentUsagesFromHbs: prevComponentUsagesFromHbs = 0,
    // tokenUsagesFromScss: prevTokenUsagesFromScss = 0,
    // tokenUsagesFromJsx: prevTokenUsagesFromJsx = 0,
  } = prev;


  // https://github.blog/2022-05-09-supercharging-github-actions-with-job-summaries/
  // https://github.com/actions/toolkit/pull/1574/files
  await summary
    .addHeading('✨ EDS Usage ✨')
    .addRaw('Successful adoption of the Expel Design System will allow us to recalibrate our UX and unify our offering across product lines. The following chart tracks usage of the different EDS assets throughout this repository.')
    .addEOL()
    .addTable([
      [
        {data: 'Asset ⭐️', header: true},
        {data: 'Usage #️⃣', header: true},
        {data: 'Change 📈', header: true},
        {data: 'Status 🌈', header: true},
      ],[
        `Tokens`,
        `${tokenUsages}`,
        getChangeMessage(tokenUsages, prevTokenUsages),
        getStatusMessage(tokenUsages, prevTokenUsages),
      ],[
        `Components`,
        `${componentUsages}`,
        getChangeMessage(tokenUsages, prevTokenUsages),
        getStatusMessage(componentUsages, prevComponentUsages)
    ]])
    .addRaw('For more information about usage of assets over time, please visit ')
    .addLink('the EDS usage chart', 'https://docs.google.com/spreadsheets/d/1G4URwMwPY2uWxeV4PNKLXBUoSr75EroaqVyFZRJ35FY/edit#gid=0https://docs.google.com/spreadsheets/d/1G4URwMwPY2uWxeV4PNKLXBUoSr75EroaqVyFZRJ35FY/edit#gid=0')
    .addEOL()
    .addHeading('Token Breakdown', '2')
    .addRaw('Tokens can be utilized in scoped globally or at the component level. The following table summarizes complete token usage.')
    .addEOL()
    .addTable(
      [
        [{data: 'Global', header: true}, {data: 'Component', header: true},  {data: 'Total', header: true}],
        [`${tokenUsagesFromScss}`, `${tokenUsagesFromJsx}`, `${tokenUsages}`]
      ]
    )
    .addHeading('Component Breakdown', '2')
    .addRaw('Design System Components can be found in Ember Templates or in React. This table breaks down the component usage across the code base.')
    .addEOL()
    .addTable(
      [
        [{data: 'React', header: true}, {data: 'Ember', header: true},  {data: 'Total #️⃣', header: true}],
        [`${componentUsagesFromJsx}`, `${componentUsagesFromHbs}`, `${componentUsages}`]
      ]
    )
    .write();
}

try {
  console.log('currentCount', getInput('currentCount'));
  const currentCount = JSON.parse(getInput('currentCount') || '{}');
  const prevCount = JSON.parse(getInput('previousCount') || '{}');

  generateMarkup(currentCount, prevCount);
} catch (error) {
  core.setFailed(error.message);
}