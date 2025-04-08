import {
  type CreateLogStreamCommandInput,
  type CreateLogStreamCommandOutput,
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
