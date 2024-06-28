# EDS Usage Markdown Output

This action accepts the output from the EDS usage script and formats it into markdown to be displayed as a job summary in the github workflow

## Inputs

### `currentCount`

**Required** A stringified object of the usage across the repository.
```
{
  tokenUsages: 10,
  componentUsages: 12,
  componentUsagesFromJsx: 10,
  componentUsagesFromHbs: 2,
  tokenUsagesFromScss: 6,
  tokenUsagesFromJsx: 4,
  overriddenBootstrapTokens: 2
}
```

## Example usage

```yaml
uses: RobinGiannattasio/github-actions-playground@v1.19
with:
  currentCount: '{"tokenUsages":10,"componentUsages":12,"componentUsagesFromJsx":10,"componentUsagesFromHbs":2,"tokenUsagesFromScss":6,"tokenUsagesFromJsx":4, overriddenBootstrapTokens: 2}'
```
