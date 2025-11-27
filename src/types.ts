/**
 * Type definitions for the Perplexity MCP Server
 */

/**
 * Represents a single message in a conversation
 */
export interface Message {
  role: string;
  content: string;
}

/**
 * Response structure from Perplexity chat completion API
 */
export interface ChatCompletionResponse {
  choices: Array<{
    message: {
      content: string;
      role?: string;
    };
    finish_reason?: string;
    index?: number;
  }>;
  citations?: string[];
  usage?: {
    prompt_tokens?: number;
    completion_tokens?: number;
    total_tokens?: number;
  };
  id?: string;
  model?: string;
  created?: number;
}

/**
 * A single search result from the Perplexity Search API
 */
export interface SearchResult {
  title: string;
  url: string;
  snippet?: string;
  date?: string;
  score?: number;
}

/**
 * Response structure from Perplexity Search API
 */
export interface SearchResponse {
  results: SearchResult[];
  query?: string;
  usage?: {
    tokens?: number;
  };
}

/**
 * Request body for Perplexity Search API
 */
export interface SearchRequestBody {
  query: string;
  max_results: number;
  max_tokens_per_page: number;
  country?: string;
}

/**
 * Options for undici fetch with proxy support
 */
export interface UndiciRequestOptions {
  [key: string]: any;
  dispatcher?: any; // ProxyAgent type from undici
}
