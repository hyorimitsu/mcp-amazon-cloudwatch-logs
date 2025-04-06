import {
  type CreateLogGroupCommandInput,
  type CreateLogGroupCommandOutput,
  LogGroupClass,
} from '@aws-sdk/client-cloudwatch-logs'
import { z } from 'zod'
import { typeSafeSchema } from '../../lib/zod/helper.ts'

export const CreateLogGroupRequestSchema = typeSafeSchema<CreateLogGroupCommandInput>()(
  z.object({
    logGroupName: z.string(),
    kmsKeyId: z.string().optional(),
    tags: z.record(z.string(), z.string()).optional(),
    logGroupClass: z.nativeEnum(LogGroupClass).optional(),
  }),
)

export const CreateLogGroupResponseSchema = typeSafeSchema<CreateLogGroupCommandOutput>()(
  z.object({
    $metadata: z.object({
      httpStatusCode: z.number(),
      requestId: z.string(),
      extendedRequestId: z.string(),
      cfId: z.string(),
      attempts: z.number(),
      totalRetryDelay: z.number(),
    }),
  }),
)
