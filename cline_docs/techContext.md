# Technical Context: Cline VSCode Extension

## Technologies Used

### Core Technologies
- **TypeScript**: Primary programming language
- **Node.js**: Runtime environment
- **VSCode Extension API**: For integration with VSCode
- **React**: For webview UI components

### Key Libraries and Dependencies
- **axios**: HTTP client for API requests
- **puppeteer-core**: Headless browser automation
- **web-tree-sitter**: Code parsing and analysis
- **execa**: Process execution
- **zod**: Schema validation
- **globby**: File system pattern matching
- **diff**: Text diffing utilities
- **@modelcontextprotocol/sdk**: MCP implementation

### API Integrations
- **Anthropic Claude API**: Primary language model
- **OpenAI API**: Alternative language model
- **OpenRouter**: API aggregation service
- **Various other LLM providers**: Through provider-specific adapters

### Development Tools
- **esbuild**: Fast JavaScript/TypeScript bundler
- **ESLint**: Code linting
- **Prettier**: Code formatting
- **Husky**: Git hooks for code quality
- **Changesets**: Version management and changelog generation

## Development Setup

### Prerequisites
- Node.js (LTS version)
- VSCode
- Git

### Local Development
1. Clone the repository
2. Run `npm install` to install dependencies
3. Run `npm run install:all` to install webview dependencies
4. Use `npm run watch` for development with hot reloading
5. Launch the extension in a new VSCode window with F5

### Building
- `npm run compile`: Builds the extension
- `npm run package`: Creates a production-ready VSIX package
- `npm run publish:marketplace`: Publishes to VSCode Marketplace

### Testing
- `npm run test`: Runs test suite
- `npm run lint`: Checks code quality
- `npm run format`: Checks formatting

## Technical Constraints

### VSCode Extension Limitations
- Limited access to VSCode internal APIs
- Webview isolation from main extension process
- Performance considerations for UI responsiveness
- Extension activation events and lifecycle management

### Language Model Constraints
- Context window limitations (varies by model)
- Rate limits and quotas from API providers
- Handling streaming responses efficiently
- Managing token usage and costs

### Browser Integration Challenges
- Cross-platform browser detection and launching
- Sandboxed browser environment
- Screenshot capture and processing
- Console log extraction

### File System Considerations
- Cross-platform path handling
- Permission management for file access
- Handling large files and directories
- Binary file detection and processing

### MCP Implementation Constraints
- Server process management
- Inter-process communication
- Security considerations for external tools
- Resource allocation and cleanup

## Dependencies

### Runtime Dependencies
The extension has several key dependencies:

1. **API Client Libraries**
   - @anthropic-ai/sdk
   - openai
   - Various provider-specific clients

2. **VSCode Integration**
   - @vscode/codicons
   - @vscode/webview-ui-toolkit (via webview)

3. **File and Process Management**
   - execa
   - globby
   - simple-git
   - get-folder-size

4. **Browser Automation**
   - puppeteer-core
   - puppeteer-chromium-resolver

5. **Parsing and Analysis**
   - web-tree-sitter
   - tree-sitter-wasms
   - cheerio
   - pdf-parse
   - mammoth (for DOCX)

6. **Utility Libraries**
   - zod
   - diff
   - delay
   - fast-deep-equal
   - serialize-error

### Development Dependencies
- TypeScript
- ESLint
- Prettier
- esbuild
- @vscode/test-electron
- @changesets/cli

## Environment Requirements

### VSCode Version
- Requires VSCode 1.84.0 or higher

### Operating System Compatibility
- Windows
- macOS
- Linux

### Hardware Considerations
- Sufficient RAM for language model responses
- Disk space for checkpoints and history
- Network connectivity for API access

## Performance Considerations

### Memory Management
- Efficient handling of large response streams
- Cleanup of browser instances and other resources
- Limiting history storage size

### Network Optimization
- Caching of API responses where appropriate
- Efficient streaming of model outputs
- Handling network interruptions gracefully

### UI Responsiveness
- Asynchronous processing to avoid blocking UI
- Progressive rendering of long responses
- Background processing for resource-intensive operations
