# Development Guide

This document provides information for developers who want to contribute to or extend the Amazon CloudWatch Logs MCP Server.

## Development Environment

This project uses [VS Code Dev Containers](https://code.visualstudio.com/docs/devcontainers/containers) for development to ensure a consistent environment across all contributors.

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

4. VS Code will build the dev container and open the project inside it.

5. Once inside the container, the development environment is fully set up with all dependencies installed.

### Development Commands

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

To add a new CloudWatch Logs operation:

1. **Define schemas** in `src/operations/schemas/`:

   - Create or update schema files with request and response schemas using Zod
   - Use the `typeSafeSchema` helper for type safety

2. **Implement the operation** in `src/operations/`:

   - Create or update operation files that use the AWS SDK
   - Implement functions that handle the CloudWatch Logs operations

3. **Add the tool name** to `src/handlers/tools/types.ts`:

   - Add a new entry to the `ToolName` object

4. **Add the tool definition** to `src/handlers/tools/tools.ts`:
   - Add a new entry to the `toolDefinition` object with appropriate metadata

For detailed examples of each step, refer to the existing code in the repository.

### Example: Adding a New Operation

Here's a more detailed example of how to add a new CloudWatch Logs operation:

#### 1. Define schemas in `src/operations/schemas/myoperation.ts`:

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

#### 2. Implement the operation in `src/operations/myoperation.ts`:

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

#### 3. Add the tool name to `src/handlers/tools/types.ts`:

```typescript
export const ToolName = {
  // Existing tool names...
  MyOperation: 'my_operation',
} as const
```

#### 4. Add the tool definition to `src/handlers/tools/tools.ts`:

```typescript
export const toolDefinition: ToolDefinition = {
  // Existing tool definitions...
  [ToolName.MyOperation]: {
    name: ToolName.MyOperation,
    description: 'Description of the new operation',
    inputSchema: zodToJsonSchema(myOperationSchema.MyOperationRequestSchema),
    requestSchema: myOperationSchema.MyOperationRequestSchema,
    operationFn: myOperation.myOperation,
    operationType: Operation.READ, // or Operation.WRITE
  },
}
```

## CI/CD Pipeline

This project uses GitHub Actions for continuous integration and continuous deployment. The following workflows are configured:

### Code Quality Checks

The `check-code-style.yaml` workflow runs on every push to the main branch, pull requests to main, and can be triggered manually:

- Runs linting checks with `pnpm run lint`
- Runs formatting checks with `pnpm run format`
- Verifies the build process with `pnpm run build`

### Automated Version Tagging

The `tagging.yaml` workflow automatically creates new version tags when the version in `package.json` is updated on the main branch:

1. When `package.json` is modified on the main branch, it compares the previous and current versions
2. If the version has changed, it creates and pushes a new tag with the format `v{version}`
3. This tag then triggers the publish workflow

### Publishing

The `publish.yaml` workflow is triggered when a tag with the pattern `v*` is pushed:

1. **npm Package Publishing**:

   - Builds the project
   - Publishes the package to npm with provenance

2. **Docker Image Publishing**:

   - Builds the Docker image
   - Pushes the image to GitHub Container Registry (ghcr.io)
   - Tags the image with various version formats (e.g., v1.2.3, v1.2, v1, latest)

3. **Release Notes Generation**:

   - Creates a GitHub release with automatically generated release notes

### Release Process

To release a new version:

1. Update the version in `package.json`
2. Commit and push the change to the main branch
3. The tagging workflow will automatically create a new tag
4. The publish workflow will be triggered by the new tag
5. The package will be published to npm and the Docker image to GitHub Container Registry
6. A GitHub release will be created with release notes

This automated process ensures consistent releases and reduces manual steps.
