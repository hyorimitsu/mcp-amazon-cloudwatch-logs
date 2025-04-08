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

Request:

```json
{
  "logGroupName": "my-application-logs",
  "tags": {
    "Environment": "Production",
    "Application": "MyApp"
  }
}
```

Response:

```json
{
  "$metadata": {
    "httpStatusCode": 200,
    "requestId": "example-request-id",
    "attempts": 1,
    "totalRetryDelay": 0
  }
}
```

### describe_log_groups

List and describe Amazon CloudWatch Logs log groups.

**Parameters:**

- `accountIdentifiers` (array of strings, optional): When `includeLinkedAccounts` is set to `True`, use this parameter to specify the list of accounts to search
- `logGroupNamePrefix` (string, optional): The prefix to match
- `logGroupNamePattern` (string, optional): If you specify a string for this parameter, the operation returns only log groups that have names that match the string based on a case-sensitive substring search
- `nextToken` (string, optional): The token for the next set of items to return
- `limit` (number, optional): The maximum number of items returned
- `includeLinkedAccounts` (boolean, optional): If you are using a monitoring account, set this to `True` to have the operation return log groups in the accounts listed in `accountIdentifiers`
- `logGroupClass` (string, optional): Specifies the log group class for this log group

**Example:**

Request:

```json
{
  "logGroupNamePrefix": "my-application",
  "limit": 10
}
```

Response:

```json
{
  "$metadata": {
    "httpStatusCode": 200,
    "requestId": "example-request-id",
    "attempts": 1,
    "totalRetryDelay": 0
  },
  "logGroups": [
    {
      "logGroupName": "my-application-logs",
      "creationTime": 1617234567890,
      "metricFilterCount": 0,
      "arn": "arn:aws:logs:us-east-1:123456789012:log-group:my-application-logs:*",
      "logGroupClass": "STANDARD",
      "logGroupArn": "arn:aws:logs:us-east-1:123456789012:log-group:my-application-logs"
    }
  ],
  "nextToken": "example-next-token"
}
```

### delete_log_group

Delete an Amazon CloudWatch Logs log group.

**Parameters:**

- `logGroupName` (string, required): The name of the log group

**Example:**

Request:

```json
{
  "logGroupName": "my-application-logs"
}
```

Response:

```json
{
  "$metadata": {
    "httpStatusCode": 200,
    "requestId": "example-request-id",
    "attempts": 1,
    "totalRetryDelay": 0
  }
}
```

### create_log_stream

Create a new log stream in an Amazon CloudWatch Logs log group.

**Parameters:**

- `logGroupName` (string, required): The name of the log group
- `logStreamName` (string, required): The name of the log stream

**Example:**

Request:

```json
{
  "logGroupName": "my-application-logs",
  "logStreamName": "instance-1234"
}
```

Response:

```json
{
  "$metadata": {
    "httpStatusCode": 200,
    "requestId": "example-request-id",
    "attempts": 1,
    "totalRetryDelay": 0
  }
}
```
