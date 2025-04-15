import {
  GetQueryResultsCommand,
  StartQueryCommand,
  StopQueryCommand,
} from '@aws-sdk/client-cloudwatch-logs'
import { type z } from 'zod'
import { client } from '../lib/aws/client.ts'
import {
  GetQueryResultsRequestSchema,
  GetQueryResultsResponseSchema,
  StartQueryRequestSchema,
  StartQueryResponseSchema,
  StopQueryRequestSchema,
  StopQueryResponseSchema,
} from './schemas/insights.ts'

export const startQuery = async (
  params: z.infer<typeof StartQueryRequestSchema>,
): Promise<z.infer<typeof StartQueryResponseSchema>> => {
  const input = StartQueryRequestSchema.parse(params)

  const command = new StartQueryCommand(input)
  const output = await client.send(command)

  return StartQueryResponseSchema.parse(output)
}

export const stopQuery = async (
  params: z.infer<typeof StopQueryRequestSchema>,
): Promise<z.infer<typeof StopQueryResponseSchema>> => {
  const input = StopQueryRequestSchema.parse(params)

  const command = new StopQueryCommand(input)
  const output = await client.send(command)

  return StopQueryResponseSchema.parse(output)
}

export const getQueryResults = async (
  params: z.infer<typeof GetQueryResultsRequestSchema>,
): Promise<z.infer<typeof GetQueryResultsResponseSchema>> => {
  const input = GetQueryResultsRequestSchema.parse(params)

  const command = new GetQueryResultsCommand(input)
  const output = await client.send(command)

  return GetQueryResultsResponseSchema.parse(output)
}
