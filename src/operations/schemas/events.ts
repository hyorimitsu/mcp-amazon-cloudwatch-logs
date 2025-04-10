import {
  EntityRejectionErrorType,
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
