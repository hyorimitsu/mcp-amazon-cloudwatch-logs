declare namespace NodeJS {
  interface ProcessEnv {
    readonly npm_package_name?: string
    readonly npm_package_version?: string
    readonly AWS_REGION?: string
    readonly READONLY?: string
  }
}
