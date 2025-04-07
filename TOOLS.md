# Amazon CloudWatch Logs MCP Server Tools

This document provides detailed information about the tools available in the Amazon CloudWatch Logs MCP Server.

> **Note:** This project is currently under active development. The available tools and their interfaces may change before the first stable release.

## Available Tools

### create_log_group

Creates a new Amazon CloudWatch Logs log group.

**Parameters:**

- `logGroupName` (string, required): A name for the log group
- `kmsKeyId` (string, optional): The Amazon Resource Name (ARN) of the KMS key to use when encrypting log data
- `tags` (object, optional): The key-value pairs to use for the tags
- `logGroupClass` (string, optional): Use this parameter to specify the log group class for this log group

**Example:**

```json
{
  "logGroupName": "my-application-logs",
  "tags": {
    "Environment": "Production",
    "Application": "MyApp"
  }
}
```

**Response:**

```json
{
  "$metadata": {
    "httpStatusCode": 200,
    "requestId": "example-request-id",
    "extendedRequestId": "example-extended-request-id",
    "cfId": "example-cf-id",
    "attempts": 1,
    "totalRetryDelay": 0
  }
}
```
