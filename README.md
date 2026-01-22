# Perplexity API Platform MCP Server

[![Install in Cursor](https://custom-icon-badges.demolab.com/badge/Install_in_Cursor-000000?style=for-the-badge&logo=cursor-ai-white)](https://cursor.com/en/install-mcp?name=perplexity-ask&config=eyJ0eXBlIjoic3RkaW8iLCJjb21tYW5kIjoibnB4IiwiYXJncyI6WyIteSIsIkB6aGFuZ3l1MTgxOC9zZXJ2ZXItcGVycGxleGl0eS1hc2siXSwiZW52Ijp7IlBFUlBMRVhJVFlfQVBJX0tFWSI6IiJ9fQ==)
&nbsp;
[![Install in VS Code](https://custom-icon-badges.demolab.com/badge/Install_in_VS_Code-007ACC?style=for-the-badge&logo=vsc&logoColor=white)](https://vscode.dev/redirect/mcp/install?name=perplexity-ask&config=%7B%22type%22%3A%22stdio%22%2C%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22%40zhangyu1818/server-perplexity-ask%22%5D%2C%22env%22%3A%7B%22PERPLEXITY_API_KEY%22%3A%22%22%7D%7D)
&nbsp;
[![npm version](https://img.shields.io/npm/v/%40zhangyu1818%2Fserver-perplexity-ask?style=for-the-badge&logo=npm&logoColor=white&color=CB3837)](https://www.npmjs.com/package/@zhangyu1818/server-perplexity-ask)

Single-tool MCP server for Perplexity chat completions via a configurable API endpoint (default: OpenRouter).

## Available Tools

### **perplexity_ask**
General-purpose conversational AI using the default `perplexity/sonar` model. Override the API endpoint with `API_ENDPOINT` and model with `MODEL`.

## Configuration

### Get Your API Key

1. Get your Perplexity API Key from the [API Portal](https://www.perplexity.ai/account/api/group)
2. Replace `your_key_here` in the configurations below with your API key
3. (Optional) Set API endpoint: `API_ENDPOINT=https://openrouter.ai/api/v1/chat/completions`
4. (Optional) Set model: `MODEL=perplexity/sonar`
5. (Optional) Set timeout: `PERPLEXITY_TIMEOUT_MS=600000` (default: 5 minutes)
6. (Optional) Set log level: `PERPLEXITY_LOG_LEVEL=DEBUG|INFO|WARN|ERROR` (default: ERROR)

### Claude Code

```bash
claude mcp add perplexity-ask --env PERPLEXITY_API_KEY="your_key_here" -- npx -y @zhangyu1818/server-perplexity-ask
```

Or install via plugin:
```bash
export PERPLEXITY_API_KEY="your_key_here"
claude
# Then run: /plugin marketplace add perplexityai/modelcontextprotocol
# Then run: /plugin install perplexity
```

### Cursor, Claude Desktop & Windsurf

We recommend using the one-click install badge at the top of this README for Cursor.

For manual setup, all these clients use the same `mcpServers` format:

| Client | Config File |
|--------|-------------|
| Cursor | `~/.cursor/mcp.json` |
| Claude Desktop | `claude_desktop_config.json` |
| Windsurf | `~/.codeium/windsurf/mcp_config.json` |

```json
{
  "mcpServers": {
    "perplexity-ask": {
      "command": "npx",
      "args": ["-y", "@zhangyu1818/server-perplexity-ask"],
      "env": {
        "PERPLEXITY_API_KEY": "your_key_here"
      }
    }
  }
}
```

### VS Code

We recommend using the one-click install badge at the top of this README for VS Code, or for manual setup, add to `.vscode/mcp.json`:

```json
{
  "servers": {
    "perplexity-ask": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "@zhangyu1818/server-perplexity-ask"],
      "env": {
        "PERPLEXITY_API_KEY": "your_key_here"
      }
    }
  }
}
```

### Codex

```bash
codex mcp add perplexity-ask --env PERPLEXITY_API_KEY="your_key_here" -- npx -y @zhangyu1818/server-perplexity-ask
```

### Other MCP Clients

Most clients can be manually configured to use the `mcpServers` wrapper in their configuration file (like Cursor). If your client doesn't work, check its documentation for the correct wrapper format.

### Proxy Setup (For Corporate Networks)

If you are running this server at work—especially behind a company firewall or proxy—you may need to tell the program how to send its internet traffic through your network's proxy. Follow these steps:

**1. Get your proxy details**

- Ask your IT department for your HTTPS proxy address and port.
- You may also need a username and password.

**2. Set the proxy environment variable**

The easiest and most reliable way for Perplexity MCP is to use `PERPLEXITY_PROXY`. For example:

```bash
export PERPLEXITY_PROXY=https://your-proxy-host:8080
```

If your proxy needs a username and password, use:

```bash
export PERPLEXITY_PROXY=https://username:password@your-proxy-host:8080
```

**3. Alternate: Standard environment variables**

If you'd rather use the standard variables, we support `HTTPS_PROXY` and `HTTP_PROXY`.

> [!NOTE]
> The server checks proxy settings in this order: `PERPLEXITY_PROXY` → `HTTPS_PROXY` → `HTTP_PROXY`. If none are set, it connects directly to the internet.
> URLs must include `https://`. Typical ports are `8080`, `3128`, and `80`.

### HTTP Server Deployment

For cloud or shared deployments, run the server in HTTP mode.

#### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PERPLEXITY_API_KEY` | Your Perplexity API key | *Required* |
| `API_ENDPOINT` | Chat completions API endpoint | `https://openrouter.ai/api/v1/chat/completions` |
| `MODEL` | Model name to request | `perplexity/sonar` |
| `PORT` | HTTP server port | `8080` |
| `BIND_ADDRESS` | Network interface to bind to | `0.0.0.0` |
| `ALLOWED_ORIGINS` | CORS origins (comma-separated) | `*` |

#### Docker

```bash
docker build -t perplexity-mcp-server .
docker run -p 8080:8080 -e PERPLEXITY_API_KEY=your_key_here perplexity-mcp-server
```

#### Node.js

```bash
export PERPLEXITY_API_KEY=your_key_here
npm install && npm run build && npm run start:http
```

The server will be accessible at `http://localhost:8080/mcp`

## Troubleshooting

- **API Key Issues**: Ensure `PERPLEXITY_API_KEY` is set correctly
- **Connection Errors**: Check your internet connection and API key validity
- **Tool Not Found**: Make sure the package is installed and the command path is correct
- **Timeout Errors**: For very long research queries, set `PERPLEXITY_TIMEOUT_MS` to a higher value
- **Proxy Issues**: Verify your `PERPLEXITY_PROXY` or `HTTPS_PROXY` setup and ensure your API endpoint isn't blocked by your firewall.
- **EOF / Initialize Errors**: Some strict MCP clients fail because `npx` writes installation messages to stdout. Use `npx -yq` instead of `npx -y` to suppress this output.

For support, visit [community.perplexity.ai](https://community.perplexity.ai) or [file an issue](https://github.com/perplexityai/modelcontextprotocol/issues).

---
