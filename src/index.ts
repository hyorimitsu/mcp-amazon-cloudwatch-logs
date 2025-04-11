#!/usr/bin/env node

import { Server } from '@modelcontextprotocol/sdk/server/index.js'
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js'
import { config } from './config/index.ts'
import { setRequestHandler } from './handlers/tools/index.ts'
import { tools } from './handlers/tools/tools.ts'

const server = new Server(
  {
    name: config.app.name,
    version: config.app.version,
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
