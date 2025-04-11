import { CloudWatchLogsClient } from '@aws-sdk/client-cloudwatch-logs'
import { config } from '../../config/index.ts'

export const client = new CloudWatchLogsClient({
  region: config.aws.region,
})
