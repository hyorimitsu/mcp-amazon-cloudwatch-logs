# Amazon CloudWatch Logs MCP Server

A Model Context Protocol (MCP) server that provides tools for interacting with Amazon CloudWatch Logs services. This server enables AI assistants to manage CloudWatch logs through a standardized interface using AWS SDK.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![CI](https://github.com/hyorimitsu/mcp-amazon-cloudwatch-logs/actions/workflows/ci.yml/badge.svg)](https://github.com/hyorimitsu/mcp-amazon-cloudwatch-logs/actions/workflows/ci.yml)

> **Note:** This project is currently under active development and not yet ready for production use. Features and APIs may change significantly before the first stable release.

## Overview

This MCP server allows AI assistants to interact with Amazon CloudWatch Logs through the Model Context Protocol. It provides a standardized interface for performing various CloudWatch Logs operations, enabling comprehensive management and monitoring of log data.

## Setup

### Using Local Development Build

```bash
# Clone the repository
git clone https://github.com/hyorimitsu/mcp-amazon-cloudwatch-logs.git
cd mcp-amazon-cloudwatch-logs

# Install dependencies
pnpm install

# Build the project
pnpm run build
```

### Configuration

#### AWS Credentials

To use the MCP server, you need to configure it with your AWS credentials. You can do this by setting environment variables:

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

#### Read-Only Mode

You can configure the server to operate in read-only mode by setting the `READONLY` environment variable to `"true"`:

```json
{
  "mcpServers": {
    "amazon-cloudwatch-logs": {
      "command": "node",
      "args": ["/path/to/mcp-amazon-cloudwatch-logs/build/index.js"],
      "env": {
        "AWS_REGION": "us-east-1",
        "AWS_ACCESS_KEY_ID": "<YOUR_ACCESS_KEY>",
        "AWS_SECRET_ACCESS_KEY": "<YOUR_SECRET_KEY>",
        "READONLY": "true"
      }
    }
  }
}
```

When read-only mode is enabled:

- Only READ operations (tools that retrieve or query information) are available
- WRITE operations (tools that create, modify, or delete resources) are disabled

This is useful for scenarios where you want to allow log viewing but prevent any modifications to your CloudWatch Logs resources. By default, read-only mode is disabled (`READONLY` is set to `"false"`), allowing both read and write operations.

> **Note:** In the future, this project will be published as an npm package and as a Docker image for easier installation and usage.

## Available Tools

| Tool Name            | Operation Type | Description                                                                              |
| -------------------- | -------------- | ---------------------------------------------------------------------------------------- |
| create_log_group     | WRITE          | Creates a new Amazon CloudWatch Logs log group                                           |
| describe_log_groups  | READ           | List and describe Amazon CloudWatch Logs log groups                                      |
| delete_log_group     | WRITE          | Delete an Amazon CloudWatch Logs log group                                               |
| create_log_stream    | WRITE          | Create a new log stream in an Amazon CloudWatch Logs log group                           |
| describe_log_streams | READ           | List and describe log streams in an Amazon CloudWatch Logs log group                     |
| delete_log_stream    | WRITE          | Delete a log stream in an Amazon CloudWatch Logs log group                               |
| put_log_events       | WRITE          | Write log events to a specified log stream in Amazon CloudWatch Logs                     |
| get_log_events       | READ           | Retrieve log events from a specified log stream in Amazon CloudWatch Logs                |
| filter_log_events    | READ           | Search log events with a pattern across log groups and streams in Amazon CloudWatch Logs |

For detailed documentation on each tool, including parameters and examples, see [TOOLS.md](https://github.com/hyorimitsu/mcp-amazon-cloudwatch-logs/blob/main/TOOLS.md).

> **Note:** This project is under development. Additional CloudWatch Logs operations are planned for future releases.

## Development

This project uses [VS Code Dev Containers](https://code.visualstudio.com/docs/devcontainers/containers) for development to ensure a consistent development environment across all contributors.

### Prerequisites for Development

- [Docker](https://www.docker.com/products/docker-desktop/)
- [Visual Studio Code](https://code.visualstudio.com/)
- [VS Code Dev Containers extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers)

### Development Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/hyorimitsu/mcp-amazon-cloudwatch-logs.git
   cd mcp-amazon-cloudwatch-logs
   ```

2. Open the project in VS Code:

   ```bash
   code .
   ```

3. When prompted, click "Reopen in Container" or use the command palette and select "Dev Containers: Reopen in Container".

4. VS Code will build the dev container and open the project inside it. This may take a few minutes the first time.

5. Once inside the container, the development environment is fully set up with all dependencies installed.

### Development Commands

All commands are run inside the dev container:

```bash
# Build the project
pnpm run build

# Run linter
pnpm run lint

# Fix linting issues
pnpm run lint:fix

# Check formatting
pnpm run format

# Fix formatting issues
pnpm run format:fix

# Test with the MCP Inspector
pnpm run inspector
```

## Extending the Server

The server is designed to be easily extensible. To add a new CloudWatch Logs operation, follow these steps:

1. **Define schemas** in `src/operations/schemas/`:

   - Create or update a schema file (e.g., `myoperation.ts`) under `src/operations/schemas/`
   - Define request and response schemas using Zod and the `typeSafeSchema` helper
   - Example:

     ```typescript
     export const MyOperationRequestSchema = typeSafeSchema<
       OptionalToUndefined<MyOperationCommandInput>
     >()(
       z.object({
         paramName: z.string().describe('Description of the parameter'),
         optionalParam: z.number().optional().describe('Description of the optional parameter'),
       }),
     )

     export const MyOperationResponseSchema = typeSafeSchema<
       OptionalToUndefined<MyOperationCommandOutput>
     >()(
       z.object({
         $metadata: MetadataSchema,
         resultField: z.string().optional().describe('Description of the result field'),
       }),
     )
     ```

2. **Implement the operation** in `src/operations/`:

   - Create or update an operation file (e.g., `myoperation.ts`) under `src/operations/`
   - Implement the operation function that uses the AWS SDK to perform the CloudWatch Logs operation
   - Example:

     ```typescript
     export const myOperation = async (
       params: z.infer<typeof MyOperationRequestSchema>,
     ): Promise<z.infer<typeof MyOperationResponseSchema>> => {
       const input = MyOperationRequestSchema.parse(params)

       const command = new MyOperationCommand(input)
       const output = await client.send(command)

       return MyOperationResponseSchema.parse(output)
     }
     ```

3. **Add the tool name** to `src/handlers/tools/types.ts`:

   - Add a new entry to the `ToolName` object
   - Example:

     ```typescript
     export const ToolName = {
       // Existing tool names...
       MyOperation: 'my_operation',
     } as const
     ```

4. **Add the tool definition** to `src/handlers/tools/tools.ts`:

   - Add a new entry to the `toolDefinitions` object
   - Example:

     ```typescript
     const toolDefinitions: ListToolDefinition & CallToolDefinition = {
       // Existing tool definitions...
       [ToolName.MyOperation]: {
         name: ToolName.MyOperation,
         description: 'Description of the new operation',
         inputSchema: zodToJsonSchema(myOperationSchema.MyOperationRequestSchema),
         requestSchema: myOperationSchema.MyOperationRequestSchema,
         operationFn: myOperation.myOperation,
         operationType: Operation.READ,
       },
     }
     ```

By following these steps, you can extend the server with new CloudWatch Logs operations while maintaining the same structure and patterns used in the existing codebase.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
