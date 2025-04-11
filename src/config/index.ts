import { getEnv } from './env.ts'

export const config = {
  app: {
    name: getEnv(process.env.npm_package_name, 'amazon-cloudwatch-logs-mcp-server'),
    /**
     * Application version string
     *
     * The default value is "x.x.x". This is deliberately used to clearly signal a misconfiguration.
     * Under normal conditions, the actual version is always read from package.json.
     * If "x.x.x" ever appears in config.app.version, it indicates that package.json could not be read,
     * helping to quickly spot and fix the issue rather than mistakenly using a valid-looking
     * (but incorrect) version.
     */
    version: getEnv(process.env.npm_package_version, 'x.x.x'),
  },
  aws: {
    region: getEnv(process.env.AWS_REGION, 'us-east-1'),
  },
}
