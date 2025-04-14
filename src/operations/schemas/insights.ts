import {
  QueryLanguage,
  type StartQueryCommandInput,
  type StartQueryCommandOutput,
} from '@aws-sdk/client-cloudwatch-logs'
import { z } from 'zod'
import { typeSafeSchema } from '../../lib/zod/helper.ts'
import { type OptionalToUndefined } from '../../types/util.ts'
import { MetadataSchema } from './common.ts'

export const StartQueryRequestSchema = typeSafeSchema<
  OptionalToUndefined<StartQueryCommandInput>
>()(
  z.object({
    queryLanguage: z
      .nativeEnum(QueryLanguage)
      .optional()
      .describe('Specify the query language to use for this query.'),
    logGroupName: z.string().optional().describe('The log group on which to perform the query.'),
    logGroupNames: z.array(z.string()).optional().describe('The list of log groups to be queried.'),
    logGroupIdentifiers: z
      .array(z.string())
      .optional()
      .describe('The list of log groups to query.'),
    startTime: z.number().describe('The beginning of the time range to query.'),
    endTime: z.number().describe('The end of the time range to query.'),
    queryString: z.string().describe('The query string to use.'),
    limit: z
      .number()
      .optional()
      .describe('The maximum number of log events to return in the query.'),
  }),
)

export const StartQueryResponseSchema = typeSafeSchema<
  OptionalToUndefined<StartQueryCommandOutput>
>()(
  z.object({
    $metadata: MetadataSchema,
    queryId: z.string().optional().describe('The unique ID of the query.'),
  }),
)
