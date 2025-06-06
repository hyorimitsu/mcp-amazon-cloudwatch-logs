# Amazon CloudWatch Logs MCP Server Tools

This document provides detailed information about the tools available in the Amazon CloudWatch Logs MCP Server.

> **Note:** This project is currently under active development. The available tools and their interfaces may change before the first stable release.

## Table of Contents

### Log Group Operations

- [create_log_group](#create_log_group-write) - Creates a log group with the specified name. You can create up to 1,000,000 log groups per Region per account.
- [describe_log_groups](#describe_log_groups-read) - Lists the specified log groups. You can list all your log groups or filter the results by prefix. The results are ASCII-sorted by log group name.
- [delete_log_group](#delete_log_group-write) - Deletes the specified log group and permanently deletes all the archived log events associated with the log group.

### Log Stream Operations

- [create_log_stream](#create_log_stream-write) - Creates a log stream for the specified log group. A log stream is a sequence of log events that originate from a single source, such as an application instance or a resource that is being monitored.
- [describe_log_streams](#describe_log_streams-read) - Lists the log streams for the specified log group. You can list all the log streams or filter the results by prefix. You can also control how the results are ordered.
- [delete_log_stream](#delete_log_stream-write) - Deletes the specified log stream and permanently deletes all the archived log events associated with the log stream.

### Log Events Operations

- [put_log_events](#put_log_events-write) - Uploads a batch of log events to the specified log stream.
- [get_log_events](#get_log_events-read) - Lists log events from the specified log stream. You can list all of the log events or filter using a time range.
- [filter_log_events](#filter_log_events-read) - Lists log events from the specified log group. You can list all log events, or filter the results by one or more of the following: a filter pattern, a time range, or the log stream name (or a log stream name prefix that matches multiple log streams).

### Insights Operations

- [start_query](#start_query-read) - Starts a query of one or more log groups using CloudWatch Logs Insights. You specify the log groups and time range to query and the query string to use.
- [stop_query](#stop_query-read) - Stops a CloudWatch Logs Insights query that is in progress. If the query has already ended, the operation returns an error indicating that the specified query is not running.
- [get_query_results](#get_query_results-read) - Returns the results from the specified query.
- [describe_queries](#describe_queries-read) - Returns a list of CloudWatch Logs Insights queries that are scheduled, running, or have been run recently in this account. You can request all queries or limit it to queries of a specific log group or queries with a certain status.

## Available Tools

### Log Group Operations

Log groups define groups of log streams that share the same retention, monitoring, and access control settings. Each log stream has to belong to one log group.

#### create_log_group [WRITE]

Creates a log group with the specified name. You can create up to 1,000,000 log groups per Region per account.

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

#### describe_log_groups [READ]

Lists the specified log groups. You can list all your log groups or filter the results by prefix. The results are ASCII-sorted by log group name.

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

#### delete_log_group [WRITE]

Deletes the specified log group and permanently deletes all the archived log events associated with the log group.

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

### Log Stream Operations

A log stream is a sequence of log events that share the same source. More specifically, a log stream is generally intended to represent the sequence of events coming from the application instance or resource being monitored.

#### create_log_stream [WRITE]

Creates a log stream for the specified log group. A log stream is a sequence of log events that originate from a single source, such as an application instance or a resource that is being monitored.

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

#### describe_log_streams [READ]

Lists the log streams for the specified log group. You can list all the log streams or filter the results by prefix. You can also control how the results are ordered.

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

#### delete_log_stream [WRITE]

Deletes the specified log stream and permanently deletes all the archived log events associated with the log stream.

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

### Log Events Operations

A log event is a record of some activity recorded by the application or resource being monitored. The log event record that CloudWatch Logs understands contains two properties: the timestamp of when the event occurred, and the raw event message.

#### put_log_events [WRITE]

Uploads a batch of log events to the specified log stream.

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

#### get_log_events [READ]

Lists log events from the specified log stream. You can list all of the log events or filter using a time range.

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

#### filter_log_events [READ]

Lists log events from the specified log group. You can list all log events, or filter the results by one or more of the following: a filter pattern, a time range, or the log stream name (or a log stream name prefix that matches multiple log streams).

**Parameters:**

- `logGroupName` (string, optional): The name of the log group to search
- `logGroupIdentifier` (string, optional): Specify either the name or ARN of the log group to view log events from
- `logStreamNames` (array of strings, optional): Filters the results to only logs from the log streams in this list
- `logStreamNamePrefix` (string, optional): Filters the results to include only events from log streams that have names starting with this prefix
- `startTime` (number, optional): The start of the time range, expressed as the number of milliseconds after Jan 1, 1970 00:00:00 UTC
- `endTime` (number, optional): The end of the time range, expressed as the number of milliseconds after Jan 1, 1970 00:00:00 UTC
- `filterPattern` (string, optional): The filter pattern to use
- `nextToken` (string, optional): The token for the next set of events to return
- `limit` (number, optional): The maximum number of events to return
- `unmask` (boolean, optional): Specify true to display the log event fields with all sensitive data unmasked and visible

**Example:**

Request:

```json
{
  "logGroupName": "my-application-logs",
  "filterPattern": "ERROR",
  "startTime": 1617234567000,
  "endTime": 1617234569000,
  "limit": 100
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
      "logStreamName": "instance-1234",
      "timestamp": 1617234567890,
      "message": "ERROR: Database connection failed",
      "ingestionTime": 1617234568000,
      "eventId": "12345678901234567890123456789012345678901234567890123456"
    },
    {
      "logStreamName": "instance-5678",
      "timestamp": 1617234568500,
      "message": "ERROR: Authentication failed for user 'admin'",
      "ingestionTime": 1617234569000,
      "eventId": "98765432109876543210987654321098765432109876543210987654"
    }
  ],
  "nextToken": "eyJsb2dTdHJlYW1OYW1lIjoiaW5zdGFuY2UtNTY3OCIsImV2ZW50SWQiOiI5ODc2NTQzMjEwOTg3NjU0MzIxMDk4NzY1NDMyMTA5ODc2NTQzMjEwOTg3NjU0MzIxMDk4NzY1NCJ9"
}
```

### Insights Operations

AWS CloudWatch Logs Insights is a fully managed service that allows you to interactively search and analyze your log data in real-time. It offers a powerful query language, simplified log data exploration, and customizable visualizations, enabling you to troubleshoot issues, detect anomalies, and gain operational insights quickly.

#### start_query [READ]

Starts a query of one or more log groups using CloudWatch Logs Insights. You specify the log groups and time range to query and the query string to use.

**Parameters:**

- `queryLanguage` (string, optional): Specify the query language to use for this query
- `logGroupName` (string, optional): The log group on which to perform the query
- `logGroupNames` (array of strings, optional): The list of log groups to be queried
- `logGroupIdentifiers` (array of strings, optional): The list of log groups to query
- `startTime` (number, required): The beginning of the time range to query
- `endTime` (number, required): The end of the time range to query
- `queryString` (string, required): The query string to use
- `limit` (number, optional): The maximum number of log events to return in the query

**Example:**

Request:

```json
{
  "logGroupNames": ["my-application-logs"],
  "startTime": 1617234567,
  "endTime": 1617320967,
  "queryString": "fields @timestamp, @message | filter @message like /ERROR/ | sort @timestamp desc"
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
  "queryId": "11a11a11-1111-11a1-11a1-11a11a11a111"
}
```

#### stop_query [READ]

Stops a CloudWatch Logs Insights query that is in progress. If the query has already ended, the operation returns an error indicating that the specified query is not running.

**Parameters:**

- `queryId` (string, required): The ID number of the query to stop

**Example:**

Request:

```json
{
  "queryId": "11a11a11-1111-11a1-11a1-11a11a11a111"
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
  "success": true
}
```

#### get_query_results [READ]

Returns the results from the specified query.

**Parameters:**

- `queryId` (string, required): The ID number of the query

**Example:**

Request:

```json
{
  "queryId": "11a11a11-1111-11a1-11a1-11a11a11a111"
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
  "queryLanguage": "CWLI",
  "results": [
    [
      {
        "field": "@timestamp",
        "value": "2023-04-01 12:34:56.789"
      },
      {
        "field": "@message",
        "value": "ERROR: Database connection failed"
      }
    ],
    [
      {
        "field": "@timestamp",
        "value": "2023-04-01 12:30:45.678"
      },
      {
        "field": "@message",
        "value": "ERROR: Authentication failed for user 'admin'"
      }
    ]
  ],
  "statistics": {
    "recordsMatched": 2,
    "recordsScanned": 1000,
    "estimatedRecordsSkipped": 0,
    "bytesScanned": 123456,
    "estimatedBytesSkipped": 0,
    "logGroupsScanned": 1
  },
  "status": "Complete"
}
```

#### describe_queries [READ]

Returns a list of CloudWatch Logs Insights queries that are scheduled, running, or have been run recently in this account. You can request all queries or limit it to queries of a specific log group or queries with a certain status.

**Parameters:**

- `logGroupName` (string, optional): Limits the returned queries to only those for the specified log group
- `status` (string, optional): Limits the returned queries to only those that have the specified status
- `maxResults` (number, optional): Limits the number of returned queries to the specified number
- `nextToken` (string, optional): The token for the next set of items to return

**Example:**

Request:

```json
{
  "status": "Running"
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
  "queries": [
    {
      "queryLanguage": "CWLI",
      "queryId": "11a11a11-1111-11a1-11a1-11a11a11a111",
      "queryString": "fields @timestamp, @message | filter @message like /ERROR/ | sort @timestamp desc",
      "status": "Running",
      "createTime": 1617234567000,
      "logGroupName": "my-application-logs"
    },
    {
      "queryLanguage": "CWLI",
      "queryId": "22b22b22-2222-22b2-22b2-22b22b22b222",
      "queryString": "fields @timestamp, @message | stats count() by bin(30s)",
      "status": "Running",
      "createTime": 1617234568000,
      "logGroupName": "my-api-logs"
    }
  ]
}
```
