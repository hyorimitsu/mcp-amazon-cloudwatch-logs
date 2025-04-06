export const getEnv = <T>(value: T | undefined, defaultValue: T) => {
  if (value === undefined) return defaultValue
  if (typeof value === 'string' && value === '') return defaultValue
  return value
}
