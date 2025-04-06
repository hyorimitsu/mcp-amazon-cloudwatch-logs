import { type z } from 'zod'
import type * as groupsSchema from '../../operations/schemas/groups.ts'

/**
 * Object containing all available tool names supported by this MCP server
 *
 * When adding new tools, add a new property to this object.
 */
export const ToolName = {
  CreateLogGroup: 'create_log_group',
} as const

type ToolNameType = (typeof ToolName)[keyof typeof ToolName]

export const isToolName = (name: unknown): name is ToolNameType =>
  Object.values(ToolName).includes(name as ToolNameType)

// Type mapping for tool configurations
type ToolConfigurations = {
  [ToolName.CreateLogGroup]: {
    requestSchema: typeof groupsSchema.CreateLogGroupRequestSchema
    requestType: z.infer<typeof groupsSchema.CreateLogGroupRequestSchema>
    responseType: z.infer<typeof groupsSchema.CreateLogGroupResponseSchema>
  }
}

// Tool definition structure for listing available tools
export type ListToolDefinition = {
  [N in ToolNameType]: {
    description?: string
    inputSchema: {
      [x: string]: unknown
      properties?: {
        [x: string]: unknown
      }
    }
  }
}

// Tool definition structure for executing tool operations
export type CallToolDefinition = {
  [N in ToolNameType]: {
    requestSchema: ToolConfigurations[N]['requestSchema']
    operationFn: (
      args: ToolConfigurations[N]['requestType'],
    ) => Promise<ToolConfigurations[N]['responseType']>
  }
}
