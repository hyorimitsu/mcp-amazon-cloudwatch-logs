# Amazon CloudWatch Logs MCP Server

A Model Context Protocol (MCP) server that provides tools for interacting with Amazon CloudWatch Logs services. This server enables AI assistants to manage CloudWatch logs through a standardized interface using AWS SDK.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Code Style](https://github.com/hyorimitsu/mcp-amazon-cloudwatch-logs/actions/workflows/check-code-style.yaml/badge.svg)](https://github.com/hyorimitsu/mcp-amazon-cloudwatch-logs/actions/workflows/check-code-style.yaml)
[![npm version](https://img.shields.io/npm/v/@hyorimitsu/amazon-cloudwatch-logs-mcp-server.svg)](https://www.npmjs.com/package/@hyorimitsu/amazon-cloudwatch-logs-mcp-server)
[![Docker Image](https://img.shields.io/badge/Docker-GHCR-blue)](https://github.com/hyorimitsu/mcp-amazon-cloudwatch-logs/pkgs/container/mcp-amazon-cloudwatch-logs)

> **Note:** This project is currently under active development and not yet ready for production use. Features and APIs may change significantly before the first stable release.

## Overview

This MCP server allows AI assistants to interact with Amazon CloudWatch Logs through the Model Context Protocol. It provides a standardized interface for performing various CloudWatch Logs operations, enabling comprehensive management and monitoring of log data.

## Quick Start

### Prerequisites

- AWS account with CloudWatch Logs access
- AWS access key and secret key with appropriate permissions
- Node.js (for npm installation) or Docker

### Installation

Choose one of the following installation methods:

#### Option 1: npm Package

```bash
# Install the package
npm install -g @hyorimitsu/amazon-cloudwatch-logs-mcp-server

# Configure in your AI assistant's configuration
# See Configuration section below
```

#### Option 2: Docker Image

```bash
# Pull the Docker image
docker pull ghcr.io/hyorimitsu/mcp-amazon-cloudwatch-logs:latest

# Configure in your AI assistant's configuration
# See Configuration section below
```

#### Option 3: Local Development Build

```bash
# Clone the repository
git clone https://github.com/hyorimitsu/mcp-amazon-cloudwatch-logs.git
cd mcp-amazon-cloudwatch-logs

# Install dependencies
pnpm install

# Build the project
pnpm run build

# Configure in your AI assistant's configuration
# See Configuration section below
```

### Configuration

Add the server to your AI assistant's configuration:

#### For npm Installation

```json
{
  "mcpServers": {
    "amazon-cloudwatch-logs": {
      "command": "amazon-cloudwatch-logs-mcp-server",
      "env": {
        "AWS_REGION": "us-east-1",
        "AWS_ACCESS_KEY_ID": "<YOUR_ACCESS_KEY>",
        "AWS_SECRET_ACCESS_KEY": "<YOUR_SECRET_KEY>"
      }
    }
  }
}
```

#### For Docker Installation

```json
{
  "mcpServers": {
    "amazon-cloudwatch-logs": {
      "command": "docker",
      "args": [
        "run",
        "-i",
        "--rm",
        "-e",
        "AWS_REGION",
        "-e",
        "AWS_ACCESS_KEY_ID",
        "-e",
        "AWS_SECRET_ACCESS_KEY",
        "ghcr.io/hyorimitsu/mcp-amazon-cloudwatch-logs"
      ],
      "env": {
        "AWS_REGION": "us-east-1",
        "AWS_ACCESS_KEY_ID": "<YOUR_ACCESS_KEY>",
        "AWS_SECRET_ACCESS_KEY": "<YOUR_SECRET_KEY>"
      }
    }
  }
}
```

#### For Local Development Build

```json
{
  "mcpServers": {
    "amazon-cloudwatch-logs": {
      "command": "node",
      "args": ["/path/to/mcp-amazon-cloudwatch-logs/build/index.js"],
      "env": {
        "AWS_REGION": "us-east-1",
        "AWS_ACCESS_KEY_ID": "<YOUR_ACCESS_KEY>",
        "AWS_SECRET_ACCESS_KEY": "<YOUR_SECRET_KEY>"
      }
    }
  }
}
```

## Environment Variables

| Variable              | Required | Description                                                     | Default   |
| --------------------- | -------- | --------------------------------------------------------------- | --------- |
| AWS_REGION            | No       | The AWS region where your CloudWatch Logs resources are located | us-east-1 |
| AWS_ACCESS_KEY_ID     | Yes      | Your AWS access key ID for authentication                       | -         |
| AWS_SECRET_ACCESS_KEY | Yes      | Your AWS secret access key for authentication                   | -         |
| READONLY              | No       | When set to "true", only read operations are allowed            | false     |

### Read-Only Mode

Enable read-only mode by setting the `READONLY` environment variable to `"true"`:

```json
"env": {
  "AWS_REGION": "us-east-1",
  "AWS_ACCESS_KEY_ID": "<YOUR_ACCESS_KEY>",
  "AWS_SECRET_ACCESS_KEY": "<YOUR_SECRET_KEY>",
  "READONLY": "true"
}
```

In read-only mode:

- Only READ operations (tools that retrieve or query information) are available
- WRITE operations (tools that create, modify, or delete resources) are disabled

This is useful for scenarios where you want to allow log viewing but prevent any modifications to your CloudWatch Logs resources.

## Available Tools

### Log Group Operations

| Tool Name           | Operation Type | Description                                                                                                                                       |
| ------------------- | -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| create_log_group    | WRITE          | Creates a log group with the specified name. You can create up to 1,000,000 log groups per Region per account.                                    |
| describe_log_groups | READ           | Lists the specified log groups. You can list all your log groups or filter the results by prefix. The results are ASCII-sorted by log group name. |
| delete_log_group    | WRITE          | Deletes the specified log group and permanently deletes all the archived log events associated with the log group.                                |

### Log Stream Operations

| Tool Name            | Operation Type | Description                                                                                                                                                                                            |
| -------------------- | -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| create_log_stream    | WRITE          | Creates a log stream for the specified log group. A log stream is a sequence of log events that originate from a single source, such as an application instance or a resource that is being monitored. |
| describe_log_streams | READ           | Lists the log streams for the specified log group. You can list all the log streams or filter the results by prefix. You can also control how the results are ordered.                                 |
| delete_log_stream    | WRITE          | Deletes the specified log stream and permanently deletes all the archived log events associated with the log stream.                                                                                   |

### Log Event Operations

| Tool Name         | Operation Type | Description                                                                                                                                                                                                                                                |
| ----------------- | -------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| put_log_events    | WRITE          | Uploads a batch of log events to the specified log stream.                                                                                                                                                                                                 |
| get_log_events    | READ           | Lists log events from the specified log stream. You can list all of the log events or filter using a time range.                                                                                                                                           |
| filter_log_events | READ           | Lists log events from the specified log group. You can list all log events, or filter the results by one or more of the following: a filter pattern, a time range, or the log stream name (or a log stream name prefix that matches multiple log streams). |

### Insights Operations

| Tool Name         | Operation Type | Description                                                                                                                                                                                                                             |
| ----------------- | -------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| start_query       | READ           | Starts a query of one or more log groups using CloudWatch Logs Insights. You specify the log groups and time range to query and the query string to use.                                                                                |
| stop_query        | READ           | Stops a CloudWatch Logs Insights query that is in progress. If the query has already ended, the operation returns an error indicating that the specified query is not running.                                                          |
| get_query_results | READ           | Returns the results from the specified query.                                                                                                                                                                                           |
| describe_queries  | READ           | Returns a list of CloudWatch Logs Insights queries that are scheduled, running, or have been run recently in this account. You can request all queries or limit it to queries of a specific log group or queries with a certain status. |

For detailed documentation on each tool, including parameters and examples, see [TOOLS.md](https://github.com/hyorimitsu/mcp-amazon-cloudwatch-logs/blob/main/TOOLS.md).

## Development

For information on developing and extending this project, please see [CONTRIBUTING.md](https://github.com/hyorimitsu/mcp-amazon-cloudwatch-logs/blob/main/CONTRIBUTING.md).

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
