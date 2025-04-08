import {
  type CreateLogStreamCommandInput,
  type CreateLogStreamCommandOutput,
  type DeleteLogStreamCommandInput,
  type DeleteLogStreamCommandOutput,
  type DescribeLogStreamsCommandInput,
  type DescribeLogStreamsCommandOutput,
  OrderBy,
} from '@aws-sdk/client-cloudwatch-logs'
import { z } from 'zod'
import { typeSafeSchema } from '../../lib/zod/helper.ts'
import { type OptionalToUndefined } from '../../types/util.ts'
import { MetadataSchema } from './common.ts'

export const CreateLogStreamRequestSchema = typeSafeSchema<
  OptionalToUndefined<CreateLogStreamCommandInput>
>()(
  z.object({
    logGroupName: z.string().describe('The name of the log group.'),
    logStreamName: z.string().describe('The name of the log stream.'),
  }),
)

export const CreateLogStreamResponseSchema = typeSafeSchema<
  OptionalToUndefined<CreateLogStreamCommandOutput>
>()(
  z.object({
    $metadata: MetadataSchema,
  }),
)

export const DescribeLogStreamsRequestSchema = typeSafeSchema<
  OptionalToUndefined<DescribeLogStreamsCommandInput>
>()(
  z.object({
    logGroupName: z.string().optional().describe('The name of the log group.'),
    logGroupIdentifier: z
      .string()
      .optional()
      .describe('Specify either the name or ARN of the log group to view.'),
    logStreamNamePrefix: z.string().optional().describe('The prefix to match.'),
    orderBy: z
      .nativeEnum(OrderBy)
      .optional()
      .describe('If the value is `LogStreamName`, the results are ordered by log stream name.'),
    descending: z
      .boolean()
      .optional()
      .describe('If the value is true, results are returned in descending order.'),
    nextToken: z.string().optional().describe('The token for the next set of items to return.'),
    limit: z.number().optional().describe('The maximum number of items returned.'),
  }),
)

export const DescribeLogStreamsResponseSchema = typeSafeSchema<
  OptionalToUndefined<DescribeLogStreamsCommandOutput>
>()(
  z.object({
    $metadata: MetadataSchema,
    logStreams: z
      .array(
        z.object({
          logStreamName: z.string().optional().describe('The name of the log stream.'),
          creationTime: z
            .number()
            .optional()
            .describe(
              'The creation time of the stream, expressed as the number of milliseconds after Jan 1, 1970 00:00:00 UTC.',
            ),
          firstEventTimestamp: z
            .number()
            .optional()
            .describe(
              'The time of the first event, expressed as the number of milliseconds after Jan 1, 1970 00:00:00 UTC.',
            ),
          lastEventTimestamp: z
            .number()
            .optional()
            .describe(
              'The time of the most recent log event in the log stream in CloudWatch Logs.',
            ),
          lastIngestionTime: z
            .number()
            .optional()
            .describe(
              'The ingestion time, expressed as the number of milliseconds after Jan 1, 1970 00:00:00 UTC.',
            ),
          uploadSequenceToken: z.string().optional().describe('The sequence token.'),
          arn: z.string().optional().describe('The Amazon Resource Name (ARN) of the log stream.'),
          storedBytes: z.number().optional().describe('The number of bytes stored.'),
        }),
      )
      .optional()
      .describe('The log streams.'),
    nextToken: z.string().optional().describe('The token for the next set of items to return.'),
  }),
)

export const DeleteLogStreamRequestSchema = typeSafeSchema<
  OptionalToUndefined<DeleteLogStreamCommandInput>
>()(
  z.object({
    logGroupName: z.string().describe('The name of the log group.'),
    logStreamName: z.string().describe('The name of the log stream.'),
  }),
)

export const DeleteLogStreamResponseSchema = typeSafeSchema<
  OptionalToUndefined<DeleteLogStreamCommandOutput>
>()(
  z.object({
    $metadata: MetadataSchema,
  }),
)
