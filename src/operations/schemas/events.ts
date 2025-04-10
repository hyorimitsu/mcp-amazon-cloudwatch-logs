import {
  EntityRejectionErrorType,
  type FilterLogEventsCommandInput,
  type FilterLogEventsCommandOutput,
  type GetLogEventsCommandInput,
  type GetLogEventsCommandOutput,
  type PutLogEventsCommandInput,
  type PutLogEventsCommandOutput,
} from '@aws-sdk/client-cloudwatch-logs'
import { z } from 'zod'
import { typeSafeSchema } from '../../lib/zod/helper.ts'
import { type OptionalToUndefined } from '../../types/util.ts'
import { MetadataSchema } from './common.ts'

export const PutLogEventsRequestSchema = typeSafeSchema<
  OptionalToUndefined<PutLogEventsCommandInput>
>()(
  z.object({
    logGroupName: z.string().describe('The name of the log group.'),
    logStreamName: z.string().describe('The name of the log stream.'),
    logEvents: z
      .array(
        z.object({
          timestamp: z
            .number()
            .describe(
              'The time the event occurred, expressed as the number of milliseconds after Jan 1, 1970 00:00:00 UTC.',
            ),
          message: z.string().describe('The raw event message.'),
        }),
      )
      .describe('The log events.'),
    sequenceToken: z
      .string()
      .optional()
      .describe(
        'The sequence token obtained from the response of the previous `PutLogEvents` call.',
      ),
    entity: z
      .object({
        keyAttributes: z
          .record(z.string(), z.string())
          .optional()
          .describe(
            'The attributes of the entity which identify the specific entity, as a list of key-value pairs.',
          ),
        attributes: z
          .record(z.string(), z.string())
          .optional()
          .describe(
            'Additional attributes of the entity that are not used to specify the identity of the entity.',
          ),
      })
      .optional()
      .describe('The entity associated with the log events.'),
  }),
)

export const PutLogEventsResponseSchema = typeSafeSchema<
  OptionalToUndefined<PutLogEventsCommandOutput>
>()(
  z.object({
    $metadata: MetadataSchema,
    nextSequenceToken: z.string().optional().describe('The next sequence token.'),
    rejectedLogEventsInfo: z
      .object({
        tooNewLogEventStartIndex: z
          .number()
          .optional()
          .describe('The index of the first log event that is too new.'),
        tooOldLogEventEndIndex: z
          .number()
          .optional()
          .describe('The index of the last log event that is too old.'),
        expiredLogEventEndIndex: z.number().optional().describe('The expired log events.'),
      })
      .optional()
      .describe('The rejected events.'),
    rejectedEntityInfo: z
      .object({
        errorType: z
          .nativeEnum(EntityRejectionErrorType)
          .describe(
            'The type of error that caused the rejection of the entity when calling `PutLogEvents`.',
          ),
      })
      .optional()
      .describe('Information about why the entity is rejected when calling `PutLogEvents`.'),
  }),
)

export const GetLogEventsRequestSchema = typeSafeSchema<
  OptionalToUndefined<GetLogEventsCommandInput>
>()(
  z.object({
    logGroupName: z.string().optional().describe('The name of the log group.'),
    logGroupIdentifier: z
      .string()
      .optional()
      .describe('Specify either the name or ARN of the log group to view events from.'),
    logStreamName: z.string().describe('The name of the log stream.'),
    startTime: z
      .number()
      .optional()
      .describe(
        'The start of the time range, expressed as the number of milliseconds after Jan 1, 1970 00:00:00 UTC.',
      ),
    endTime: z
      .number()
      .optional()
      .describe(
        'The end of the time range, expressed as the number of milliseconds after Jan 1, 1970 00:00:00 UTC.',
      ),
    nextToken: z.string().optional().describe('The token for the next set of items to return.'),
    limit: z.number().optional().describe('The maximum number of log events returned.'),
    startFromHead: z
      .boolean()
      .optional()
      .describe(
        'If the value is true, the earliest log events are returned first. If the value is false, the latest log events are returned first.',
      ),
    unmask: z
      .boolean()
      .optional()
      .describe(
        'Specify true to display the log event fields with all sensitive data unmasked and visible.',
      ),
  }),
)

export const GetLogEventsResponseSchema = typeSafeSchema<
  OptionalToUndefined<GetLogEventsCommandOutput>
>()(
  z.object({
    $metadata: MetadataSchema,
    events: z
      .array(
        z.object({
          timestamp: z
            .number()
            .optional()
            .describe(
              'The time the event occurred, expressed as the number of milliseconds after Jan 1, 1970 00:00:00 UTC.',
            ),
          message: z.string().optional().describe('The data contained in the log event.'),
          ingestionTime: z
            .number()
            .optional()
            .describe(
              'The time the event was ingested, expressed as the number of milliseconds after Jan 1, 1970 00:00:00 UTC.',
            ),
        }),
      )
      .optional()
      .describe('The events.'),
    nextForwardToken: z
      .string()
      .optional()
      .describe('The token for the next set of items in the forward direction.'),
    nextBackwardToken: z
      .string()
      .optional()
      .describe('The token for the next set of items in the backward direction.'),
  }),
)

export const FilterLogEventsRequestSchema = typeSafeSchema<
  OptionalToUndefined<FilterLogEventsCommandInput>
>()(
  z.object({
    logGroupName: z.string().optional().describe('The name of the log group to search.'),
    logGroupIdentifier: z
      .string()
      .optional()
      .describe('Specify either the name or ARN of the log group to view log events from.'),
    logStreamNames: z
      .array(z.string())
      .optional()
      .describe('Filters the results to only logs from the log streams in this list.'),
    logStreamNamePrefix: z
      .string()
      .optional()
      .describe(
        'Filters the results to include only events from log streams that have names starting with this prefix.',
      ),
    startTime: z
      .number()
      .optional()
      .describe(
        'The start of the time range, expressed as the number of milliseconds after Jan 1, 1970 00:00:00 UTC.',
      ),
    endTime: z
      .number()
      .optional()
      .describe(
        'The end of the time range, expressed as the number of milliseconds after Jan 1, 1970 00:00:00 UTC.',
      ),
    filterPattern: z.string().optional().describe('The filter pattern to use.'),
    nextToken: z.string().optional().describe('The token for the next set of events to return.'),
    limit: z.number().optional().describe('The maximum number of events to return.'),
    unmask: z
      .boolean()
      .optional()
      .describe(
        'Specify true to display the log event fields with all sensitive data unmasked and visible.',
      ),
  }),
)

export const FilterLogEventsResponseSchema = typeSafeSchema<
  OptionalToUndefined<FilterLogEventsCommandOutput>
>()(
  z.object({
    $metadata: MetadataSchema,
    events: z
      .array(
        z.object({
          logStreamName: z
            .string()
            .optional()
            .describe('The name of the log stream to which this event belongs.'),
          timestamp: z
            .number()
            .optional()
            .describe(
              'The time the event occurred, expressed as the number of milliseconds after Jan 1, 1970 00:00:00 UTC.',
            ),
          message: z.string().optional().describe('The data contained in the log event.'),
          ingestionTime: z
            .number()
            .optional()
            .describe(
              'The time the event was ingested, expressed as the number of milliseconds after Jan 1, 1970 00:00:00 UTC.',
            ),
          eventId: z.string().optional().describe('The ID of the event.'),
        }),
      )
      .optional()
      .describe('The matched events.'),
    nextToken: z
      .string()
      .optional()
      .describe('The token to use when requesting the next set of items.'),
  }),
)
