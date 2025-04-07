import {
  type CreateLogGroupCommandInput,
  type CreateLogGroupCommandOutput,
  LogGroupClass,
} from '@aws-sdk/client-cloudwatch-logs'
import { z } from 'zod'
import { typeSafeSchema } from '../../lib/zod/helper.ts'

export const CreateLogGroupRequestSchema = typeSafeSchema<CreateLogGroupCommandInput>()(
  z.object({
    logGroupName: z.string().describe('A name for the log group.'),
    kmsKeyId: z
      .string()
      .optional()
      .describe('The Amazon Resource Name (ARN) of the KMS key to use when encrypting log data.'),
    tags: z
      .record(z.string(), z.string())
      .optional()
      .describe('The key-value pairs to use for the tags.'),
    logGroupClass: z
      .nativeEnum(LogGroupClass)
      .optional()
      .describe('Use this parameter to specify the log group class for this log group.'),
  }),
)

export const CreateLogGroupResponseSchema = typeSafeSchema<CreateLogGroupCommandOutput>()(
  z.object({
    $metadata: z
      .object({
        httpStatusCode: z
          .number()
          .describe('The status code of the last HTTP response received for this operation.'),
        requestId: z
          .string()
          .describe(
            'A unique identifier for the last request sent for this operation. Often requested by AWS service teams to aid in debugging.',
          ),
        extendedRequestId: z
          .string()
          .describe('A secondary identifier for the last request sent. Used for debugging.'),
        cfId: z
          .string()
          .describe('A tertiary identifier for the last request sent. Used for debugging.'),
        attempts: z.number().describe('The number of times this operation was attempted.'),
        totalRetryDelay: z
          .number()
          .describe(
            'The total amount of time (in milliseconds) that was spent waiting between retry attempts.',
          ),
      })
      .describe('Metadata pertaining to this request.'),
  }),
)
