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

### describe_log_streams

List and describe log streams in an Amazon CloudWatch Logs log group.

**Parameters:**

- `logGroupName` (string, optional): The name of the log group
- `logGroupIdentifier` (string, optional): Specify either the name or ARN of the log group to view
- `logStreamNamePrefix` (string, optional): The prefix to match
- `orderBy` (string, optional): If the value is `LogStreamName`, the results are ordered by log stream name
- `descending` (boolean, optional): If the value is true, results are returned in descending order
- `nextToken` (string, optional): The token for the next set of items to return
- `limit` (number, optional): The maximum number of items returned

**Example:**

Request:

```json
{
  "logGroupName": "my-application-logs",
  "logStreamNamePrefix": "instance-",
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
  "logStreams": [
    {
      "logStreamName": "instance-1234",
      "creationTime": 1617234567890,
      "firstEventTimestamp": 1617234568000,
      "lastEventTimestamp": 1617234569000,
      "lastIngestionTime": 1617234570000,
      "uploadSequenceToken": "example-sequence-token",
      "arn": "arn:aws:logs:us-east-1:123456789012:log-group:my-application-logs:log-stream:instance-1234",
      "storedBytes": 1024
    }
  ],
  "nextToken": "example-next-token"
}
```

### delete_log_stream

Delete a log stream in an Amazon CloudWatch Logs log group.

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

### put_log_events

Write log events to a specified log stream in Amazon CloudWatch Logs.

**Parameters:**

- `logGroupName` (string, required): The name of the log group
- `logStreamName` (string, required): The name of the log stream
- `logEvents` (array, required): The log events. Each log event requires:
  - `timestamp` (number, required): The time the event occurred, expressed as the number of milliseconds after Jan 1, 1970 00:00:00 UTC
  - `message` (string, required): The raw event message
- `sequenceToken` (string, optional): The sequence token obtained from the response of the previous `PutLogEvents` call
- `entity` (object, optional): The entity associated with the log events. This parameter is optional and can be omitted. If provided, there are specific requirements from the AWS CloudWatch Logs service:
  - `keyAttributes` (object, optional): The attributes of the entity which identify the specific entity, as a list of key-value pairs
  - `attributes` (object, optional): Additional attributes of the entity that are not used to specify the identity of the entity

**Example:**

Request:

```json
{
  "logGroupName": "my-application-logs",
  "logStreamName": "instance-1234",
  "logEvents": [
    {
      "timestamp": 1617234567890,
      "message": "Application started successfully"
    },
    {
      "timestamp": 1617234568000,
      "message": "User login: user123"
    }
  ],
  "sequenceToken": "49039859626139772178092492226314046488092720276871163859"
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
  "nextSequenceToken": "49661406557421394122123153072888641584939163463656145986"
}
```

### get_log_events

Retrieve log events from a specified log stream in Amazon CloudWatch Logs.

**Parameters:**

- `logGroupName` (string, optional): The name of the log group
- `logGroupIdentifier` (string, optional): Specify either the name or ARN of the log group to view events from
- `logStreamName` (string, required): The name of the log stream
- `startTime` (number, optional): The start of the time range, expressed as the number of milliseconds after Jan 1, 1970 00:00:00 UTC
- `endTime` (number, optional): The end of the time range, expressed as the number of milliseconds after Jan 1, 1970 00:00:00 UTC
- `nextToken` (string, optional): The token for the next set of items to return
- `limit` (number, optional): The maximum number of log events returned
- `startFromHead` (boolean, optional): If the value is true, the earliest log events are returned first. If the value is false, the latest log events are returned first.
- `unmask` (boolean, optional): Specify true to display the log event fields with all sensitive data unmasked and visible

**Example:**

Request:

```json
{
  "logGroupName": "my-application-logs",
  "logStreamName": "instance-1234",
  "startTime": 1617234567000,
  "endTime": 1617234569000,
  "limit": 100,
  "startFromHead": true
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
  "events": [
    {
      "timestamp": 1617234567890,
      "message": "Application started successfully",
      "ingestionTime": 1617234568000
    },
    {
      "timestamp": 1617234568000,
      "message": "User login: user123",
      "ingestionTime": 1617234568500
    }
  ],
  "nextForwardToken": "f/12345678901234567890123456789012345678901234567890123456",
  "nextBackwardToken": "b/12345678901234567890123456789012345678901234567890123456"
}
```
