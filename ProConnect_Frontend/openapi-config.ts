import type { ConfigFile } from '@rtk-query/codegen-openapi'

const config: ConfigFile = {
  schemaFile: 'http://10.100.102.5:8080/v3/api-docs',
  apiFile: './src/Services/Redux/EmptyApi.ts',
  apiImport: 'emptySplitApi',
  outputFile: './src/Services/Redux/Api.ts',
  exportName: 'api',
  hooks: true,
  tag: true,
}

export default config