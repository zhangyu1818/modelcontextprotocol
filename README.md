# Custom MCP Server for Perplexity/OpenRouter

A customized MCP server that provides configurable access to Perplexity and OpenRouter AI models through environment variables.

## Recent Changes

This server has been modified from the original Perplexity MCP implementation with the following changes:

### ✅ Environment Variable Configuration
- **`PERPLEXITY_API_KEY`** (Required): Your API key for the service
- **`PERPLEXITY_ENDPOINT`** (Optional): API endpoint URL. Defaults to `https://openrouter.ai/api/v1`
- **`PERPLEXITY_ASK_MODEL`** (Optional): Model for general conversations. Defaults to `perplexity/sonar`
- **`PERPLEXITY_RESEARCH_MODEL`** (Optional): Model for deep research tasks. Defaults to `perplexity/sonar-deep-research`
- **`PERPLEXITY_REASON_MODEL`** (Optional): Model for reasoning tasks. Defaults to `perplexity/sonar-reasoning`
- **`PERPLEXITY_TIMEOUT_MS`** (Optional): Request timeout in milliseconds. Defaults to 300000 (5 minutes)

### ✅ Tool Modifications
- **Removed**: `perplexity_search` tool and all related functionality
- **Kept**: `perplexity_ask`, `perplexity_research`, and `perplexity_reason` tools
- **Updated**: All tools now use configurable models instead of hardcoded ones

### ✅ Flexible API Integration
- Configurable API endpoint allows use with OpenRouter, Perplexity, or compatible services
- Model names are fully customizable through environment variables
- Maintains the same MCP protocol interface for seamless integration

## Available Tools

### **perplexity_ask**
General-purpose conversational AI using the model specified by `PERPLEXITY_ASK_MODEL`. Perfect for quick questions and everyday conversations.

### **perplexity_research**
Deep, comprehensive research using the model specified by `PERPLEXITY_RESEARCH_MODEL`. Ideal for thorough analysis and detailed reports.

### **perplexity_reason**
Advanced reasoning and problem-solving using the model specified by `PERPLEXITY_REASON_MODEL`. Perfect for complex analytical tasks.

## Configuration Examples

### Claude Desktop
```json
{
  "mcpServers": {
    "custom-perplexity": {
      "command": "npx",
      "args": ["-y", "@perplexity-ai/mcp-server"],
      "env": {
        "PERPLEXITY_API_KEY": "your_key_here",
        "PERPLEXITY_ENDPOINT": "https://openrouter.ai/api/v1",
        "PERPLEXITY_ASK_MODEL": "perplexity/sonar",
        "PERPLEXITY_RESEARCH_MODEL": "perplexity/sonar-deep-research",
        "PERPLEXITY_REASON_MODEL": "perplexity/sonar-reasoning"
      }
    }
  }
}
```

### Environment Variables
```bash
export PERPLEXITY_API_KEY="your_key_here"
export PERPLEXITY_ENDPOINT="https://openrouter.ai/api/v1"
export PERPLEXITY_ASK_MODEL="perplexity/sonar"
export PERPLEXITY_RESEARCH_MODEL="perplexity/sonar-deep-research"
export PERPLEXITY_REASON_MODEL="perplexity/sonar-reasoning"
export PERPLEXITY_TIMEOUT_MS="300000"
```

## Usage

Run the server with your configured environment:

```bash
npx @perplexity-ai/mcp-server
```

The server will automatically use the models and endpoint specified in your environment variables.
