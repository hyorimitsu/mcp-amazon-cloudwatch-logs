import { zodToJsonSchema } from 'zod-to-json-schema'
import { config } from '../../config/index.ts'
import * as events from '../../operations/events.ts'
import * as groups from '../../operations/groups.ts'
import * as insights from '../../operations/insights.ts'
import * as eventsSchema from '../../operations/schemas/events.ts'
import * as groupsSchema from '../../operations/schemas/groups.ts'
import * as insightsSchema from '../../operations/schemas/insights.ts'
import * as streamsSchema from '../../operations/schemas/streams.ts'
import * as streams from '../../operations/streams.ts'
import {
  type CallToolDefinition,
  isToolName,
  type ListToolDefinition,
  type ListToolDefinitionItem,
  Operation,
  type OperationType,
  ToolName,
  type ToolNameType,
} from './types.ts'

// prettier-ignore
type ToolDefinition =
  ListToolDefinition &
  CallToolDefinition &
  { [N in ToolNameType]: { operationType: OperationType } }

export const toolDefinition: ToolDefinition = {
  // Log group operations
  [ToolName.CreateLogGroup]: {
    name: ToolName.CreateLogGroup,
    description: 'Create a new Amazon CloudWatch Logs log group',
    inputSchema: zodToJsonSchema(groupsSchema.CreateLogGroupRequestSchema),
    requestSchema: groupsSchema.CreateLogGroupRequestSchema,
    operationFn: groups.createLogGroup,
    operationType: Operation.WRITE,
  },
  [ToolName.DescribeLogGroups]: {
    name: ToolName.DescribeLogGroups,
    description: 'List and describe Amazon CloudWatch Logs log groups',
    inputSchema: zodToJsonSchema(groupsSchema.DescribeLogGroupsRequestSchema),
    requestSchema: groupsSchema.DescribeLogGroupsRequestSchema,
    operationFn: groups.describeLogGroups,
    operationType: Operation.READ,
  },
  [ToolName.DeleteLogGroup]: {
    name: ToolName.DeleteLogGroup,
    description: 'Delete an Amazon CloudWatch Logs log group',
    inputSchema: zodToJsonSchema(groupsSchema.DeleteLogGroupRequestSchema),
    requestSchema: groupsSchema.DeleteLogGroupRequestSchema,
    operationFn: groups.deleteLogGroup,
    operationType: Operation.WRITE,
  },
  // Log stream operations
  [ToolName.CreateLogStream]: {
    name: ToolName.CreateLogStream,
    description: 'Create a new log stream in an Amazon CloudWatch Logs log group',
    inputSchema: zodToJsonSchema(streamsSchema.CreateLogStreamRequestSchema),
    requestSchema: streamsSchema.CreateLogStreamRequestSchema,
    operationFn: streams.createLogStream,
    operationType: Operation.WRITE,
  },
  [ToolName.DescribeLogStreams]: {
    name: ToolName.DescribeLogStreams,
    description: 'List and describe log streams in an Amazon CloudWatch Logs log group',
    inputSchema: zodToJsonSchema(streamsSchema.DescribeLogStreamsRequestSchema),
    requestSchema: streamsSchema.DescribeLogStreamsRequestSchema,
    operationFn: streams.describeLogStreams,
    operationType: Operation.READ,
  },
  [ToolName.DeleteLogStream]: {
    name: ToolName.DeleteLogStream,
    description: 'Delete a log stream in an Amazon CloudWatch Logs log group',
    inputSchema: zodToJsonSchema(streamsSchema.DeleteLogStreamRequestSchema),
    requestSchema: streamsSchema.DeleteLogStreamRequestSchema,
    operationFn: streams.deleteLogStream,
    operationType: Operation.WRITE,
  },
  // Log events operations
  [ToolName.PutLogEvents]: {
    name: ToolName.PutLogEvents,
    description: 'Write log events to a specified log stream in Amazon CloudWatch Logs',
    inputSchema: zodToJsonSchema(eventsSchema.PutLogEventsRequestSchema),
    requestSchema: eventsSchema.PutLogEventsRequestSchema,
    operationFn: events.putLogEvents,
    operationType: Operation.WRITE,
  },
  [ToolName.GetLogEvents]: {
    name: ToolName.GetLogEvents,
    description: 'Retrieve log events from a specified log stream in Amazon CloudWatch Logs',
    inputSchema: zodToJsonSchema(eventsSchema.GetLogEventsRequestSchema),
    requestSchema: eventsSchema.GetLogEventsRequestSchema,
    operationFn: events.getLogEvents,
    operationType: Operation.READ,
  },
  [ToolName.FilterLogEvents]: {
    name: ToolName.FilterLogEvents,
    description:
      'Search log events with a pattern across log groups and streams in Amazon CloudWatch Logs',
    inputSchema: zodToJsonSchema(eventsSchema.FilterLogEventsRequestSchema),
    requestSchema: eventsSchema.FilterLogEventsRequestSchema,
    operationFn: events.filterLogEvents,
    operationType: Operation.READ,
  },
  // Insights query operations
  [ToolName.StartQuery]: {
    name: ToolName.StartQuery,
    description: 'Start a CloudWatch Logs Insights query',
    inputSchema: zodToJsonSchema(insightsSchema.StartQueryRequestSchema),
    requestSchema: insightsSchema.StartQueryRequestSchema,
    operationFn: insights.startQuery,
    operationType: Operation.READ,
  },
  [ToolName.StopQuery]: {
    name: ToolName.StopQuery,
    description: 'Stop a running CloudWatch Logs Insights query',
    inputSchema: zodToJsonSchema(insightsSchema.StopQueryRequestSchema),
    requestSchema: insightsSchema.StopQueryRequestSchema,
    operationFn: insights.stopQuery,
    operationType: Operation.READ,
  },
  [ToolName.GetQueryResults]: {
    name: ToolName.GetQueryResults,
    description: 'Retrieve the results of a CloudWatch Logs Insights query',
    inputSchema: zodToJsonSchema(insightsSchema.GetQueryResultsRequestSchema),
    requestSchema: insightsSchema.GetQueryResultsRequestSchema,
    operationFn: insights.getQueryResults,
    operationType: Operation.READ,
  },
  [ToolName.DescribeQueries]: {
    name: ToolName.DescribeQueries,
    description: 'List and describe CloudWatch Logs Insights queries',
    inputSchema: zodToJsonSchema(insightsSchema.DescribeQueriesRequestSchema),
    requestSchema: insightsSchema.DescribeQueriesRequestSchema,
    operationFn: insights.describeQueries,
    operationType: Operation.READ,
  },
}

// Available tools for Amazon CloudWatch Logs operations (for listing)
export const tools: ListToolDefinitionItem[] = Object.entries(toolDefinition)
  .filter(([, value]) => (config.readonly ? value.operationType !== Operation.WRITE : true))
  .map(([, value]) => ({
    name: value.name,
    description: value.description,
    inputSchema: value.inputSchema,
  }))

// Available tools for Amazon CloudWatch Logs operations (for execution)
export const callTools = Object.entries(toolDefinition)
  .filter(([, value]) => (config.readonly ? value.operationType !== Operation.WRITE : true))
  .reduce<CallToolDefinition>((acc, [key, value]) => {
    if (isToolName(key)) {
      acc[key] = {
        requestSchema: value.requestSchema,
        operationFn: value.operationFn,
      }
    }
    return acc
  }, {} as CallToolDefinition)
