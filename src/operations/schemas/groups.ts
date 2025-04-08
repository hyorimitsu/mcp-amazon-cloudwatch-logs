import {
  type CreateLogGroupCommandInput,
  type CreateLogGroupCommandOutput,
  DataProtectionStatus,
  type DescribeLogGroupsCommandInput,
  type DescribeLogGroupsCommandOutput,
  InheritedProperty,
  LogGroupClass,
} from '@aws-sdk/client-cloudwatch-logs'
import { z } from 'zod'
import { typeSafeSchema } from '../../lib/zod/helper.ts'
import { type OptionalToUndefined } from '../../types/util.ts'
import { MetadataSchema } from './common.ts'

export const CreateLogGroupRequestSchema = typeSafeSchema<
  OptionalToUndefined<CreateLogGroupCommandInput>
>()(
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

export const CreateLogGroupResponseSchema = typeSafeSchema<
  OptionalToUndefined<CreateLogGroupCommandOutput>
>()(
  z.object({
    $metadata: MetadataSchema,
  }),
)

export const DescribeLogGroupsRequestSchema = typeSafeSchema<
  OptionalToUndefined<DescribeLogGroupsCommandInput>
>()(
  z.object({
    accountIdentifiers: z
      .array(z.string())
      .optional()
      .describe(
        'When `includeLinkedAccounts` is set to `True`, use this parameter to specify the list of accounts to search.',
      ),
    logGroupNamePrefix: z.string().optional().describe('The prefix to match.'),
    logGroupNamePattern: z
      .string()
      .optional()
      .describe(
        'If you specify a string for this parameter, the operation returns only log groups that have names that match the string based on a case-sensitive substring search.',
      ),
    nextToken: z.string().optional().describe('The token for the next set of items to return.'),
    limit: z.number().optional().describe('The maximum number of items returned.'),
    includeLinkedAccounts: z
      .boolean()
      .optional()
      .describe(
        'If you are using a monitoring account, set this to `True` to have the operation return log groups in the accounts listed in `accountIdentifiers`.',
      ),
    logGroupClass: z
      .nativeEnum(LogGroupClass)
      .optional()
      .describe('Specifies the log group class for this log group'),
  }),
)

export const DescribeLogGroupsResponseSchema = typeSafeSchema<
  OptionalToUndefined<DescribeLogGroupsCommandOutput>
>()(
  z.object({
    $metadata: MetadataSchema,
    logGroups: z
      .array(
        z.object({
          logGroupName: z.string().optional().describe('The name of the log group.'),
          creationTime: z
            .number()
            .optional()
            .describe(
              'The creation time of the log group, expressed as the number of milliseconds after Jan 1, 1970 00:00:00 UTC.',
            ),
          retentionInDays: z
            .number()
            .optional()
            .describe('The number of days to retain the log events in the specified log group.'),
          metricFilterCount: z.number().optional().describe('The number of metric filters.'),
          arn: z.string().optional().describe('The Amazon Resource Name (ARN) of the log group.'),
          storedBytes: z.number().optional().describe('The number of bytes stored.'),
          kmsKeyId: z
            .string()
            .optional()
            .describe(
              'The Amazon Resource Name (ARN) of the KMS key to use when encrypting log data.',
            ),
          dataProtectionStatus: z
            .nativeEnum(DataProtectionStatus)
            .optional()
            .describe(
              'Displays whether this log group has a protection policy, or whether it had one in the past.',
            ),
          inheritedProperties: z
            .array(z.nativeEnum(InheritedProperty))
            .optional()
            .describe(
              'Displays all the properties that this log group has inherited from account-level settings.',
            ),
          logGroupClass: z
            .nativeEnum(LogGroupClass)
            .optional()
            .describe('This specifies the log group class for this log group.'),
          logGroupArn: z
            .string()
            .optional()
            .describe('The Amazon Resource Name (ARN) of the log group.'),
        }),
      )
      .optional()
      .describe('The log groups.'),
    nextToken: z.string().optional().describe('The token for the next set of items to return.'),
  }),
)
