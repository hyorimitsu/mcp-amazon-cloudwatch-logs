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
    description:
      'Creates a log group with the specified name. You can create up to 1,000,000 log groups per Region per account.',
    inputSchema: zodToJsonSchema(groupsSchema.CreateLogGroupRequestSchema),
    requestSchema: groupsSchema.CreateLogGroupRequestSchema,
    operationFn: groups.createLogGroup,
    operationType: Operation.WRITE,
  },
  [ToolName.DescribeLogGroups]: {
    name: ToolName.DescribeLogGroups,
    description:
      'Lists the specified log groups. You can list all your log groups or filter the results by prefix. The results are ASCII-sorted by log group name.',
    inputSchema: zodToJsonSchema(groupsSchema.DescribeLogGroupsRequestSchema),
    requestSchema: groupsSchema.DescribeLogGroupsRequestSchema,
    operationFn: groups.describeLogGroups,
    operationType: Operation.READ,
  },
  [ToolName.DeleteLogGroup]: {
    name: ToolName.DeleteLogGroup,
    description:
      'Deletes the specified log group and permanently deletes all the archived log events associated with the log group.',
    inputSchema: zodToJsonSchema(groupsSchema.DeleteLogGroupRequestSchema),
    requestSchema: groupsSchema.DeleteLogGroupRequestSchema,
    operationFn: groups.deleteLogGroup,
    operationType: Operation.WRITE,
  },
  // Log stream operations
  [ToolName.CreateLogStream]: {
    name: ToolName.CreateLogStream,
    description:
      'Creates a log stream for the specified log group. A log stream is a sequence of log events that originate from a single source, such as an application instance or a resource that is being monitored.',
    inputSchema: zodToJsonSchema(streamsSchema.CreateLogStreamRequestSchema),
    requestSchema: streamsSchema.CreateLogStreamRequestSchema,
    operationFn: streams.createLogStream,
    operationType: Operation.WRITE,
  },
  [ToolName.DescribeLogStreams]: {
    name: ToolName.DescribeLogStreams,
    description:
      'Lists the log streams for the specified log group. You can list all the log streams or filter the results by prefix. You can also control how the results are ordered.',
    inputSchema: zodToJsonSchema(streamsSchema.DescribeLogStreamsRequestSchema),
    requestSchema: streamsSchema.DescribeLogStreamsRequestSchema,
    operationFn: streams.describeLogStreams,
    operationType: Operation.READ,
  },
  [ToolName.DeleteLogStream]: {
    name: ToolName.DeleteLogStream,
    description:
      'Deletes the specified log stream and permanently deletes all the archived log events associated with the log stream.',
    inputSchema: zodToJsonSchema(streamsSchema.DeleteLogStreamRequestSchema),
    requestSchema: streamsSchema.DeleteLogStreamRequestSchema,
    operationFn: streams.deleteLogStream,
    operationType: Operation.WRITE,
  },
  // Log events operations
  [ToolName.PutLogEvents]: {
    name: ToolName.PutLogEvents,
    description: 'Uploads a batch of log events to the specified log stream.',
    inputSchema: zodToJsonSchema(eventsSchema.PutLogEventsRequestSchema),
    requestSchema: eventsSchema.PutLogEventsRequestSchema,
    operationFn: events.putLogEvents,
    operationType: Operation.WRITE,
  },
  [ToolName.GetLogEvents]: {
    name: ToolName.GetLogEvents,
    description:
      'Lists log events from the specified log stream. You can list all of the log events or filter using a time range.',
    inputSchema: zodToJsonSchema(eventsSchema.GetLogEventsRequestSchema),
    requestSchema: eventsSchema.GetLogEventsRequestSchema,
    operationFn: events.getLogEvents,
    operationType: Operation.READ,
  },
  [ToolName.FilterLogEvents]: {
    name: ToolName.FilterLogEvents,
    description:
      'Lists log events from the specified log group. You can list all log events, or filter the results by one or more of the following: a filter pattern, a time range, or the log stream name (or a log stream name prefix that matches multiple log streams).',
    inputSchema: zodToJsonSchema(eventsSchema.FilterLogEventsRequestSchema),
    requestSchema: eventsSchema.FilterLogEventsRequestSchema,
    operationFn: events.filterLogEvents,
    operationType: Operation.READ,
  },
  // Insights query operations
  [ToolName.StartQuery]: {
    name: ToolName.StartQuery,
    description:
      'Starts a query of one or more log groups using CloudWatch Logs Insights. You specify the log groups and time range to query and the query string to use.',
    inputSchema: zodToJsonSchema(insightsSchema.StartQueryRequestSchema),
    requestSchema: insightsSchema.StartQueryRequestSchema,
    operationFn: insights.startQuery,
    operationType: Operation.READ,
  },
  [ToolName.StopQuery]: {
    name: ToolName.StopQuery,
    description:
      'Stops a CloudWatch Logs Insights query that is in progress. If the query has already ended, the operation returns an error indicating that the specified query is not running.',
    inputSchema: zodToJsonSchema(insightsSchema.StopQueryRequestSchema),
    requestSchema: insightsSchema.StopQueryRequestSchema,
    operationFn: insights.stopQuery,
    operationType: Operation.READ,
  },
  [ToolName.GetQueryResults]: {
    name: ToolName.GetQueryResults,
    description: 'Returns the results from the specified query.',
    inputSchema: zodToJsonSchema(insightsSchema.GetQueryResultsRequestSchema),
    requestSchema: insightsSchema.GetQueryResultsRequestSchema,
    operationFn: insights.getQueryResults,
    operationType: Operation.READ,
  },
  [ToolName.DescribeQueries]: {
    name: ToolName.DescribeQueries,
    description:
      'Returns a list of CloudWatch Logs Insights queries that are scheduled, running, or have been run recently in this account. You can request all queries or limit it to queries of a specific log group or queries with a certain status.',
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
