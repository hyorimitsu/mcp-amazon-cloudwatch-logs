import { CloudWatchLogsClient } from '@aws-sdk/client-cloudwatch-logs'
import { DEFAULT_AWS_REGION } from '../../config/constants.ts'
import { getEnv } from '../../config/env.ts'

export const client = new CloudWatchLogsClient({
  region: getEnv(process.env.AWS_REGION, DEFAULT_AWS_REGION),
})
