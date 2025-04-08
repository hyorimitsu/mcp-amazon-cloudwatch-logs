import { type ResponseMetadata } from '@smithy/types'
import { z } from 'zod'
import { typeSafeSchema } from '../../lib/zod/helper.ts'

export const MetadataSchema = typeSafeSchema<ResponseMetadata>()(
  z
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
)
