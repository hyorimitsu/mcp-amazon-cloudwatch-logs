import { CreateLogGroupCommand, DescribeLogGroupsCommand } from '@aws-sdk/client-cloudwatch-logs'
import { type z } from 'zod'
import { client } from '../lib/aws/client.ts'
import {
  CreateLogGroupRequestSchema,
  CreateLogGroupResponseSchema,
  DescribeLogGroupsRequestSchema,
  DescribeLogGroupsResponseSchema,
} from './schemas/groups.ts'

export const createLogGroup = async (
  params: z.infer<typeof CreateLogGroupRequestSchema>,
): Promise<z.infer<typeof CreateLogGroupResponseSchema>> => {
  const input = CreateLogGroupRequestSchema.parse(params)

  const command = new CreateLogGroupCommand(input)
  const output = await client.send(command)

  return CreateLogGroupResponseSchema.parse(output)
}

export const describeLogGroups = async (
  params: z.infer<typeof DescribeLogGroupsRequestSchema>,
): Promise<z.infer<typeof DescribeLogGroupsResponseSchema>> => {
  const input = DescribeLogGroupsRequestSchema.parse(params)

  const command = new DescribeLogGroupsCommand(input)
  const output = await client.send(command)

  return DescribeLogGroupsResponseSchema.parse(output)
}
