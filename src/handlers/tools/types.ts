import { type z, type ZodType } from 'zod'

/**
 * Object containing all available tool names supported by this MCP server
 *
 * When adding new tools, add a new property to this object.
 */
export const ToolName = {
  CreateLogGroup: 'create_log_group',
  DescribeLogGroups: 'describe_log_groups',
  DeleteLogGroup: 'delete_log_group',
  CreateLogStream: 'create_log_stream',
  DescribeLogStreams: 'describe_log_streams',
  DeleteLogStream: 'delete_log_stream',
  PutLogEvents: 'put_log_events',
  GetLogEvents: 'get_log_events',
  FilterLogEvents: 'filter_log_events',
} as const

export type ToolNameType = (typeof ToolName)[keyof typeof ToolName]

export const isToolName = (name: unknown): name is ToolNameType =>
  Object.values(ToolName).includes(name as ToolNameType)

/**
 * Object containing operation types for tools
 *
 * Used to indicate whether a tool is for reference (read-only) or for updating (write operations)
 */
export const Operation = {
  READ: 'READ',
  WRITE: 'WRITE',
} as const

export type OperationType = (typeof Operation)[keyof typeof Operation]

// Tool definition structure for listing available tools
export type ListToolDefinitionItem = {
  name: ToolNameType
  description?: string | undefined
  inputSchema: {
    [x: string]: unknown
    properties?: {
      [x: string]: unknown
    }
  }
}
export type ListToolDefinition = {
  [N in ToolNameType]: ListToolDefinitionItem
}

// Tool definition structure for executing tool operations
export type CallToolDefinitionItem = {
  requestSchema: ZodType
  operationFn: (args: z.infer<ZodType>) => Promise<z.infer<ZodType>>
}
export type CallToolDefinition = {
  [N in ToolNameType]: CallToolDefinitionItem
}
