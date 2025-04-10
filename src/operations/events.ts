import { PutLogEventsCommand } from '@aws-sdk/client-cloudwatch-logs'
import { type z } from 'zod'
import { client } from '../lib/aws/client.ts'
import { PutLogEventsRequestSchema, PutLogEventsResponseSchema } from './schemas/events.ts'

export const putLogEvents = async (
  params: z.infer<typeof PutLogEventsRequestSchema>,
): Promise<z.infer<typeof PutLogEventsResponseSchema>> => {
  const input = PutLogEventsRequestSchema.parse(params)

  const command = new PutLogEventsCommand(input)
  const output = await client.send(command)

  return PutLogEventsResponseSchema.parse(output)
}
