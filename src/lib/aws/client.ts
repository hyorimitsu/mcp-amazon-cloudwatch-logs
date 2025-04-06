import { CloudWatchLogsClient } from '@aws-sdk/client-cloudwatch-logs'
import { DEFAULT_AWS_REGION } from '../../config/constants.ts'

export const client = new CloudWatchLogsClient({
  region:
    process.env.AWS_REGION !== undefined && process.env.AWS_REGION !== ''
      ? process.env.AWS_REGION
      : DEFAULT_AWS_REGION,
})
