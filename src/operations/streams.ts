import { CreateLogStreamCommand, DescribeLogStreamsCommand } from '@aws-sdk/client-cloudwatch-logs'
import { type z } from 'zod'
import { client } from '../lib/aws/client.ts'
import {
  CreateLogStreamRequestSchema,
  CreateLogStreamResponseSchema,
  DescribeLogStreamsRequestSchema,
  DescribeLogStreamsResponseSchema,
} from './schemas/streams.ts'

export const createLogStream = async (
  params: z.infer<typeof CreateLogStreamRequestSchema>,
): Promise<z.infer<typeof CreateLogStreamResponseSchema>> => {
  const input = CreateLogStreamRequestSchema.parse(params)

  const command = new CreateLogStreamCommand(input)
  const output = await client.send(command)

  return CreateLogStreamResponseSchema.parse(output)
}

export const describeLogStreams = async (
  params: z.infer<typeof DescribeLogStreamsRequestSchema>,
): Promise<z.infer<typeof DescribeLogStreamsResponseSchema>> => {
  const input = DescribeLogStreamsRequestSchema.parse(params)

  const command = new DescribeLogStreamsCommand(input)
  const output = await client.send(command)

  return DescribeLogStreamsResponseSchema.parse(output)
}
