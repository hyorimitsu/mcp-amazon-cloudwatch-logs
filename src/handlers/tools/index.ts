import { CloudWatchLogsServiceException } from '@aws-sdk/client-cloudwatch-logs'
import { type Server } from '@modelcontextprotocol/sdk/server/index.js'
import {
  type CallToolRequest,
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js'
import { z } from 'zod'
import { callTools, tools } from './tools.ts'
import { isToolName } from './types.ts'

export const setRequestHandler = (server: Server) => {
  // Handler for listing available tools
  server.setRequestHandler(ListToolsRequestSchema, async () => ({
    tools: tools,
  }))

  // Handler for tool execution requests
  server.setRequestHandler(CallToolRequestSchema, async (request: CallToolRequest) => {
    try {
      if (request.params.arguments === undefined) {
        throw new Error('Tool execution failed: Arguments are required for this operation')
      }
      if (!isToolName(request.params.name)) {
        throw new Error(
          `Tool execution failed: Unknown tool "${request.params.name}". Please use one of the available tools.`,
        )
      }

      const tool = callTools[request.params.name]
      const args = tool.requestSchema.parse(request.params.arguments)
      const results = await tool.operationFn(args)

      return {
        content: [{ type: 'text', text: JSON.stringify(results, null, 2) }],
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errorDetails = error.errors
          .map(err => `[${err.code}] ${err.path.join('.')}: ${err.message}`)
          .join('; ')
        throw new Error(`Tool execution failed: Invalid input parameters. ${errorDetails}`)
      }
      if (error instanceof CloudWatchLogsServiceException) {
        throw new Error(
          `Tool execution failed: Amazon CloudWatch Logs service returned an error. ${error.name}: ${error.message}`,
        )
      }
      throw error
    }
  })
}
