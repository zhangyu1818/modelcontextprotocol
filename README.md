# Perplexity API Platform MCP Server

The official MCP server implementation for the Perplexity API Platform, providing AI assistants with real-time web search, reasoning, and research capabilities through Sonar models and the Search API.

Please refer to the official [DeepWiki page](https://deepwiki.com/ppl-ai/modelcontextprotocol) for assistance with implementation.

## Available Tools

### **perplexity_search**
Direct web search using the Perplexity Search API. Returns ranked search results with metadata, perfect for finding current information.

### **perplexity_ask** 
General-purpose conversational AI with real-time web search using the `sonar-pro` model. Great for quick questions and everyday searches.

### **perplexity_research**
Deep, comprehensive research using the `sonar-deep-research` model. Ideal for thorough analysis and detailed reports.

### **perplexity_reason**
Advanced reasoning and problem-solving using the `sonar-reasoning-pro` model. Perfect for complex analytical tasks.

> [!TIP]
> Available as an optional parameter for **perplexity_reason** and **perplexity_research**: `strip_thinking`
>
> Set to `true` to remove `<think>...</think>` tags from the response, saving context tokens. Default: `false`

## Configuration

### Get Your API Key
1. Get your Perplexity API Key from the [API Portal](https://www.perplexity.ai/account/api/group)
2. Set it as an environment variable: `PERPLEXITY_API_KEY=your_key_here`
3. (Optional) Set a timeout for requests: `PERPLEXITY_TIMEOUT_MS=600000`. The default is 5 minutes.

### Claude Code

Run in your terminal:

```bash
claude mcp add perplexity --transport stdio --env PERPLEXITY_API_KEY=your_key_here -- npx -y perplexity-mcp
```

Or add to your `claude.json`:

```json
"mcpServers": {
  "perplexity": {
    "type": "stdio",
    "command": "npx",
    "args": [
      "-y",
      "perplexity-mcp"
    ],
    "env": {
      "PERPLEXITY_API_KEY": "your_key_here",
      "PERPLEXITY_TIMEOUT_MS": "600000"
    }
  }
}
```

### Cursor

Add to your `mcp.json`:

```json
{
  "mcpServers": {
    "perplexity": {
      "command": "npx",
      "args": ["-y", "@perplexity-ai/mcp-server"],
      "env": {
        "PERPLEXITY_API_KEY": "your_key_here",
        "PERPLEXITY_TIMEOUT_MS": "600000"
      }
    }
  }
}
```

### Codex

Run in your terminal:

```bash
codex mcp add perplexity --env PERPLEXITY_API_KEY=your_key_here -- npx -y @perplexity-ai/mcp-server
```

### Claude Desktop

Add to your `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "perplexity": {
      "command": "npx",
      "args": ["-y", "@perplexity-ai/mcp-server"],
      "env": {
        "PERPLEXITY_API_KEY": "your_key_here",
        "PERPLEXITY_TIMEOUT_MS": "600000"
      }
    }
  }
}
```

### Other MCP Clients

For any MCP-compatible client, use:

```bash
npx @perplexity-ai/mcp-server
```

### Proxy Setup (For Corporate Networks)

If you are running this server at work—especially behind a company firewall or proxy—you may need to tell the program how to send its internet traffic through your network's proxy. Follow these steps:

**1. Get your proxy details**

- Ask your IT department for your HTTP(S) proxy address and port.
- You may also need a username and password.

**2. Set the proxy environment variable**

The easiest and most reliable way for Perplexity MCP is to use `PERPLEXITY_PROXY`. For example:

```bash
export PERPLEXITY_PROXY=http://your-proxy-host:8080
```

- If your proxy needs a username and password, use:
  ```bash
  export PERPLEXITY_PROXY=http://username:password@your-proxy-host:8080
  ```

**3. Alternate: Standard environment variables**

If you'd rather use the standard variables, we support `HTTPS_PROXY` and `HTTP_PROXY`.

> [!NOTE]
>The server checks proxy settings in this order: `PERPLEXITY_PROXY` → `HTTPS_PROXY` → `HTTP_PROXY`. If none are set, it connects directly to the internet.

## Troubleshooting

- **API Key Issues**: Ensure `PERPLEXITY_API_KEY` is set correctly
- **Connection Errors**: Check your internet connection and API key validity
- **Tool Not Found**: Make sure the package is installed and the command path is correct
- **Timeout Errors**: For very long research queries, set `PERPLEXITY_TIMEOUT_MS` to a higher value
- **Proxy Issues**: If you're behind a corporate firewall and experience connection errors, you likely need to set up a proxy:
  - Obtain your proxy server address and port from your IT department.
  - Set the environment variable before running the server, e.g.:
    - `export PERPLEXITY_PROXY=http://proxy-address:port`
    - If authentication is needed: `export PERPLEXITY_PROXY=http://username:password@proxy-address:port`
    - Typical proxy ports include 8080, 3128, or 80.
  - The format for authenticated proxies is:  
    `http://username:password@proxy-host:port`
  - Double-check the address, port, and credentials if connections fail or time out.
  - If you continue to have issues, your firewall may be blocking traffic; ask IT if traffic for `api.perplexity.ai` is being restricted.

For support, visit [community.perplexity.ai](https://community.perplexity.ai) or [file an issue](https://github.com/perplexityai/modelcontextprotocol/issues).

---

