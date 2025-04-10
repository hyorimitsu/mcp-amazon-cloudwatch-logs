import { zodToJsonSchema } from 'zod-to-json-schema'
import * as events from '../../operations/events.ts'
import * as groups from '../../operations/groups.ts'
import * as eventsSchema from '../../operations/schemas/events.ts'
import * as groupsSchema from '../../operations/schemas/groups.ts'
import * as streamsSchema from '../../operations/schemas/streams.ts'
import * as streams from '../../operations/streams.ts'
import { type CallToolDefinition, type ListToolDefinition, ToolName } from './types.ts'

// Available tools for Amazon CloudWatch Logs operations (for listing)
export const tools: ListToolDefinition = {
  [ToolName.CreateLogGroup]: {
    description: 'Create a new Amazon CloudWatch Logs log group',
    inputSchema: zodToJsonSchema(groupsSchema.CreateLogGroupRequestSchema),
  },
  [ToolName.DescribeLogGroups]: {
    description: 'List and describe Amazon CloudWatch Logs log groups',
    inputSchema: zodToJsonSchema(groupsSchema.DescribeLogGroupsRequestSchema),
  },
  [ToolName.DeleteLogGroup]: {
    description: 'Delete an Amazon CloudWatch Logs log group',
    inputSchema: zodToJsonSchema(groupsSchema.DeleteLogGroupRequestSchema),
  },
  [ToolName.CreateLogStream]: {
    description: 'Create a new log stream in an Amazon CloudWatch Logs log group',
    inputSchema: zodToJsonSchema(streamsSchema.CreateLogStreamRequestSchema),
  },
  [ToolName.DescribeLogStreams]: {
    description: 'List and describe log streams in an Amazon CloudWatch Logs log group',
    inputSchema: zodToJsonSchema(streamsSchema.DescribeLogStreamsRequestSchema),
  },
  [ToolName.DeleteLogStream]: {
    description: 'Delete a log stream in an Amazon CloudWatch Logs log group',
    inputSchema: zodToJsonSchema(streamsSchema.DeleteLogStreamRequestSchema),
  },
  [ToolName.PutLogEvents]: {
    description: 'Write log events to a specified log stream in Amazon CloudWatch Logs',
    inputSchema: zodToJsonSchema(eventsSchema.PutLogEventsRequestSchema),
  },
  [ToolName.GetLogEvents]: {
    description: 'Retrieve log events from a specified log stream in Amazon CloudWatch Logs',
    inputSchema: zodToJsonSchema(eventsSchema.GetLogEventsRequestSchema),
  },
}

// Available tools for Amazon CloudWatch Logs operations (for execution)
export const callTools: CallToolDefinition = {
  [ToolName.CreateLogGroup]: {
    requestSchema: groupsSchema.CreateLogGroupRequestSchema,
    operationFn: groups.createLogGroup,
  },
  [ToolName.DescribeLogGroups]: {
    requestSchema: groupsSchema.DescribeLogGroupsRequestSchema,
    operationFn: groups.describeLogGroups,
  },
  [ToolName.DeleteLogGroup]: {
    requestSchema: groupsSchema.DeleteLogGroupRequestSchema,
    operationFn: groups.deleteLogGroup,
  },
  [ToolName.CreateLogStream]: {
    requestSchema: streamsSchema.CreateLogStreamRequestSchema,
    operationFn: streams.createLogStream,
  },
  [ToolName.DescribeLogStreams]: {
    requestSchema: streamsSchema.DescribeLogStreamsRequestSchema,
    operationFn: streams.describeLogStreams,
  },
  [ToolName.DeleteLogStream]: {
    requestSchema: streamsSchema.DeleteLogStreamRequestSchema,
    operationFn: streams.deleteLogStream,
  },
  [ToolName.PutLogEvents]: {
    requestSchema: eventsSchema.PutLogEventsRequestSchema,
    operationFn: events.putLogEvents,
  },
  [ToolName.GetLogEvents]: {
    requestSchema: eventsSchema.GetLogEventsRequestSchema,
    operationFn: events.getLogEvents,
  },
}
