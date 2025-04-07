#!/usr/bin/env node

import { Server } from '@modelcontextprotocol/sdk/server/index.js'
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js'
import { DEFAULT_APP_NAME, DEFAULT_APP_VERSION } from './config/constants.ts'
import { getEnv } from './config/env.ts'
import { setRequestHandler } from './handlers/tools/index.ts'
import { tools } from './handlers/tools/tools.ts'

const server = new Server(
  {
    name: getEnv(process.env.npm_package_name, DEFAULT_APP_NAME),
    version: getEnv(process.env.npm_package_version, DEFAULT_APP_VERSION),
  },
  {
    capabilities: {
      tools: Object.entries(tools).reduce(
        (acc, [key, item]) => ({
          ...acc,
          [key]: {
            name: key,
            description: item.description,
            inputSchema: item.inputSchema,
          },
        }),
        {},
      ),
    },
  },
)

setRequestHandler(server)

const main = async () => {
  const transport = new StdioServerTransport()
  await server.connect(transport)
}

main().catch(err => {
  console.error('Server initialization failed: ', err)
  process.exit(1)
})
