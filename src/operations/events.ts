import { GetLogEventsCommand, PutLogEventsCommand } from '@aws-sdk/client-cloudwatch-logs'
import { type z } from 'zod'
import { client } from '../lib/aws/client.ts'
import {
  GetLogEventsRequestSchema,
  GetLogEventsResponseSchema,
  PutLogEventsRequestSchema,
  PutLogEventsResponseSchema,
} from './schemas/events.ts'

export const putLogEvents = async (
  params: z.infer<typeof PutLogEventsRequestSchema>,
): Promise<z.infer<typeof PutLogEventsResponseSchema>> => {
  const input = PutLogEventsRequestSchema.parse(params)

  const command = new PutLogEventsCommand(input)
  const output = await client.send(command)

  return PutLogEventsResponseSchema.parse(output)
}

export const getLogEvents = async (
  params: z.infer<typeof GetLogEventsRequestSchema>,
): Promise<z.infer<typeof GetLogEventsResponseSchema>> => {
  const input = GetLogEventsRequestSchema.parse(params)

  const command = new GetLogEventsCommand(input)
  const output = await client.send(command)

  return GetLogEventsResponseSchema.parse(output)
}
