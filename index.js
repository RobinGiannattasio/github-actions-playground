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

const getChangeMessage = (current, prev) => {
  const change = current - prev;
  return `${change}${change > 0 ? ' 🔥' : ''}`
}

const getStatusMessage = (current, prev) => {
  // Assume increase means good, status quo means fine, and decrease is bad
  const change = current - prev;
  if (change > 0) return '🟢';
  if (change < 0) return '🟠';
  return '⚪️'
};

const generateMarkup = async (current, prev) => {
  const {
    tokenUsages = 0,
    componentUsages = 0,
    componentUsagesFromJsx = 0,
    componentUsagesFromHbs = 0,
    tokenUsagesFromScss = 0,
    tokenUsagesFromJsx = 0,
    overriddenBootstrapTokens = 0
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
    .addTable([
      [
        {data: '⭐️ Asset', header: true},
        {data: '#️⃣ Usage', header: true},
        {data: '📈 Change', header: true},
        {data: '🌈 Status', header: true},
      ],[
        `Tokens`,
        `${tokenUsages}`,
        getChangeMessage(tokenUsages, prevTokenUsages),
        getStatusMessage(tokenUsages, prevTokenUsages),
      ],[
        `Components`,
        `${componentUsages}`,
        getChangeMessage(componentUsages, prevComponentUsages),
        getStatusMessage(componentUsages, prevComponentUsages)
    ]])
    .addRaw('Successful adoption of the Expel Design System will allow us to recalibrate our UX and unify our offering across product lines. Please visit the ')
    .addLink('EDS usage chart ', 'https://docs.google.com/spreadsheets/d/1G4URwMwPY2uWxeV4PNKLXBUoSr75EroaqVyFZRJ35FY/edit#gid=0https://docs.google.com/spreadsheets/d/1G4URwMwPY2uWxeV4PNKLXBUoSr75EroaqVyFZRJ35FY/edit#gid=0')
    .addRaw('for more information about usage of assets over time.')
    .addHeading('Detailed Breakdown', '2')
    .addRaw('Asset usage is analyzed across the entire repository. Here is a more detailed view into where assets are being used.')
    .addHeading('Token', '4')
    .addTable([
      [
        {data: 'Global', header: true},
        {data: 'Component', header: true},
        {data: 'Bootstrap Override', header: true},
        {data: '#️⃣ Total', header: true}
      ],[
        `${tokenUsagesFromScss}`,
        `${overriddenBootstrapTokens}`,
        `${tokenUsagesFromJsx}`,
        `${tokenUsages}`
    ]])
    .addHeading('Component', '3')
    .addTable([
      [
        {data: 'React', header: true},
        {data: 'Ember', header: true},
        {data: '#️⃣ Total', header: true}
      ],[
        `${componentUsagesFromJsx}`,
        `${componentUsagesFromHbs}`,
        `${componentUsages}`,
    ]])
    .write();
}

try {
  console.log('currentCount', getInput('currentCount'));
  console.log('previousCount', getInput('previousCount'));
  const currentCount = JSON.parse(getInput('currentCount') || '{}');
  const prevCount = JSON.parse(getInput('previousCount') || '{}');

  generateMarkup(currentCount, prevCount);
} catch (error) {
  core.setFailed(error.message);
}