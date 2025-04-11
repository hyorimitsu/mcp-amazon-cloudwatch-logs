#!/usr/bin/env node

import { Server } from '@modelcontextprotocol/sdk/server/index.js'
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js'
import { config } from './config/index.ts'
import { setRequestHandler } from './handlers/tools/index.ts'
import { toolDefinition } from './handlers/tools/tools.ts'

const server = new Server(
  {
    name: config.app.name,
    version: config.app.version,
  },
  {
    capabilities: {
      tools: toolDefinition,
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
