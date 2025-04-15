import {
  type GetQueryResultsCommandInput,
  type GetQueryResultsCommandOutput,
  QueryLanguage,
  QueryStatus,
  type StartQueryCommandInput,
  type StartQueryCommandOutput,
  type StopQueryCommandInput,
  type StopQueryCommandOutput,
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

export const StopQueryRequestSchema = typeSafeSchema<OptionalToUndefined<StopQueryCommandInput>>()(
  z.object({
    queryId: z.string().describe('The ID number of the query to stop.'),
  }),
)

export const StopQueryResponseSchema = typeSafeSchema<
  OptionalToUndefined<StopQueryCommandOutput>
>()(
  z.object({
    $metadata: MetadataSchema,
    success: z
      .boolean()
      .optional()
      .describe('This is true if the query was stopped by the `StopQuery` operation.'),
  }),
)

export const GetQueryResultsRequestSchema = typeSafeSchema<
  OptionalToUndefined<GetQueryResultsCommandInput>
>()(
  z.object({
    queryId: z.string().describe('The ID number of the query.'),
  }),
)

export const GetQueryResultsResponseSchema = typeSafeSchema<
  OptionalToUndefined<GetQueryResultsCommandOutput>
>()(
  z.object({
    $metadata: MetadataSchema,
    queryLanguage: z
      .nativeEnum(QueryLanguage)
      .optional()
      .describe('The query language used for this query.'),
    results: z
      .array(
        z.array(
          z.object({
            field: z.string().optional().describe('The log event field.'),
            value: z.string().optional().describe('The value of this field.'),
          }),
        ),
      )
      .optional()
      .describe(
        'The log events that matched the query criteria during the most recent time it ran.',
      ),
    statistics: z
      .object({
        recordsMatched: z
          .number()
          .optional()
          .describe('The number of log events that matched the query string.'),
        recordsScanned: z
          .number()
          .optional()
          .describe('The total number of log events scanned during the query.'),
        estimatedRecordsSkipped: z
          .number()
          .optional()
          .describe(
            'An estimate of the number of log events that were skipped when processing this query, because the query contained an indexed field.',
          ),
        bytesScanned: z
          .number()
          .optional()
          .describe('The total number of bytes in the log events scanned during the query.'),
        estimatedBytesSkipped: z
          .number()
          .optional()
          .describe(
            'An estimate of the number of bytes in the log events that were skipped when processing this query, because the query contained an indexed field.',
          ),
        logGroupsScanned: z
          .number()
          .optional()
          .describe('The number of log groups that were scanned by this query.'),
      })
      .optional()
      .describe(
        'Includes the number of log events scanned by the query, the number of log events that matched the query criteria, and the total number of bytes in the scanned log events.',
      ),
    status: z
      .nativeEnum(QueryStatus)
      .optional()
      .describe('The status of the most recent running of the query.'),
    encryptionKey: z
      .string()
      .optional()
      .describe(
        "If you associated an KMS key with the CloudWatch Logs Insights query results in this account, this field displays the ARN of the key that's used to encrypt the query results when `StartQuery` stores them.",
      ),
  }),
)
