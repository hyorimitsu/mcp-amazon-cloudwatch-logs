export const DEFAULT_APP_NAME = 'amazon-cloudwatch-logs-mcp-server'

/**
 * Default version string used when package.json version cannot be read
 *
 * The "x.x.x" is deliberately used as a fallback version string to signal a misconfiguration.
 * Under normal conditions, the actual version is always read from package.json.
 * If "x.x.x" ever appears, it indicates that package.json could not be read,
 * helping to quickly spot and fix the issue rather than mistakenly using a valid-looking (but incorrect) version.
 */
export const DEFAULT_APP_VERSION = 'x.x.x'

export const DEFAULT_AWS_REGION = 'us-east-1'
