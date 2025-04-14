import { StartQueryCommand } from '@aws-sdk/client-cloudwatch-logs'
import { type z } from 'zod'
import { client } from '../lib/aws/client.ts'
import { StartQueryRequestSchema, StartQueryResponseSchema } from './schemas/insights.ts'

export const startQuery = async (
  params: z.infer<typeof StartQueryRequestSchema>,
): Promise<z.infer<typeof StartQueryResponseSchema>> => {
  const input = StartQueryRequestSchema.parse(params)

  const command = new StartQueryCommand(input)
  const output = await client.send(command)

  return StartQueryResponseSchema.parse(output)
}
