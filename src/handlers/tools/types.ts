import { type z } from 'zod'
import type * as eventsSchema from '../../operations/schemas/events.ts'
import type * as groupsSchema from '../../operations/schemas/groups.ts'
import type * as streamsSchema from '../../operations/schemas/streams.ts'

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
  [ToolName.DescribeLogGroups]: {
    requestSchema: typeof groupsSchema.DescribeLogGroupsRequestSchema
    requestType: z.infer<typeof groupsSchema.DescribeLogGroupsRequestSchema>
    responseType: z.infer<typeof groupsSchema.DescribeLogGroupsResponseSchema>
  }
  [ToolName.DeleteLogGroup]: {
    requestSchema: typeof groupsSchema.DeleteLogGroupRequestSchema
    requestType: z.infer<typeof groupsSchema.DeleteLogGroupRequestSchema>
    responseType: z.infer<typeof groupsSchema.DeleteLogGroupResponseSchema>
  }
  [ToolName.CreateLogStream]: {
    requestSchema: typeof streamsSchema.CreateLogStreamRequestSchema
    requestType: z.infer<typeof streamsSchema.CreateLogStreamRequestSchema>
    responseType: z.infer<typeof streamsSchema.CreateLogStreamResponseSchema>
  }
  [ToolName.DescribeLogStreams]: {
    requestSchema: typeof streamsSchema.DescribeLogStreamsRequestSchema
    requestType: z.infer<typeof streamsSchema.DescribeLogStreamsRequestSchema>
    responseType: z.infer<typeof streamsSchema.DescribeLogStreamsResponseSchema>
  }
  [ToolName.DeleteLogStream]: {
    requestSchema: typeof streamsSchema.DeleteLogStreamRequestSchema
    requestType: z.infer<typeof streamsSchema.DeleteLogStreamRequestSchema>
    responseType: z.infer<typeof streamsSchema.DeleteLogStreamResponseSchema>
  }
  [ToolName.PutLogEvents]: {
    requestSchema: typeof eventsSchema.PutLogEventsRequestSchema
    requestType: z.infer<typeof eventsSchema.PutLogEventsRequestSchema>
    responseType: z.infer<typeof eventsSchema.PutLogEventsResponseSchema>
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
