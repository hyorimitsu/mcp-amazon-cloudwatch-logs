import { zodToJsonSchema } from 'zod-to-json-schema'
import * as groups from '../../operations/groups.ts'
import * as groupsSchema from '../../operations/schemas/groups.ts'
import { type CallToolDefinition, type ListToolDefinition, ToolName } from './types.ts'

// Available tools for Amazon CloudWatch Logs operations (for listing)
export const tools: ListToolDefinition = {
  [ToolName.CreateLogGroup]: {
    description: 'Create a new Amazon CloudWatch Logs log group',
    inputSchema: zodToJsonSchema(groupsSchema.CreateLogGroupRequestSchema),
  },
}

// Available tools for Amazon CloudWatch Logs operations (for execution)
export const callTools: CallToolDefinition = {
  [ToolName.CreateLogGroup]: {
    requestSchema: groupsSchema.CreateLogGroupRequestSchema,
    operationFn: groups.createLogGroup,
  },
}
