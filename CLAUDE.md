# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `npm run build` - Compiles TypeScript to JavaScript in `dist/` directory and makes files executable
- `npm run prepare` - Same as build (runs automatically on install)
- `npm run watch` - Runs TypeScript compiler in watch mode for development
- `npm run test` - Not configured (no test framework in project)

## Architecture Overview

This is a Model Context Protocol (MCP) server that provides Perplexity AI API capabilities as MCP tools. The entire application is contained in a single `index.ts` file with the following structure:

### Core Components

- **MCP Server Setup** (`index.ts:351-361`): Uses `@modelcontextprotocol/sdk` to create a stdio-based server
- **Tool Definitions** (`index.ts:16-155`): Four MCP tools with JSON schemas:
  - `perplexity_ask` - General conversation using sonar-pro model
  - `perplexity_research` - Deep research using sonar-deep-research model
  - `perplexity_reason` - Reasoning tasks using sonar-reasoning-pro model
  - `perplexity_search` - Web search via Perplexity Search API

### API Integration

- **Chat Completion** (`index.ts:177-247`): Handles conversational AI requests to Perplexity's chat API
- **Search Function** (`index.ts:287-348`): Handles web search requests to Perplexity's search API
- **Error Handling**: Comprehensive error handling with timeouts and detailed error messages
- **Authentication**: Uses `PERPLEXITY_API_KEY` environment variable for API authentication

### Request Handling

- **Tool Registration** (`index.ts:367-369`): Registers all available tools with MCP server
- **Call Handler** (`index.ts:378-460`): Routes tool calls to appropriate functions with validation

## Configuration

- **API Key**: Required `PERPLEXITY_API_KEY` environment variable
- **Timeout**: Optional `PERPLEXITY_TIMEOUT_MS` (default: 300000ms = 5 minutes)
- **Node Version**: Requires Node.js >=18
- **Package Entry Point**: `dist/index.js` (generated TypeScript output)

## Installation & Distribution

- Published as `@perplexity-ai/mcp-server` on npm
- Binary name: `perplexity-mcp`
- Supports standard MCP clients (Claude Desktop, Cursor, etc.) via stdio transport