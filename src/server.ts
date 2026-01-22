import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { fetch as undiciFetch, ProxyAgent } from "undici";
import type {
  Message,
  ChatCompletionResponse,
  UndiciRequestOptions
} from "./types.js";
import { ChatCompletionResponseSchema } from "./validation.js";

const PERPLEXITY_API_KEY = process.env.PERPLEXITY_API_KEY;
const DEFAULT_API_ENDPOINT = "https://openrouter.ai/api/v1/chat/completions";
const DEFAULT_MODEL = "perplexity/sonar";

export function getProxyUrl(): string | undefined {
  return process.env.PERPLEXITY_PROXY || 
         process.env.HTTPS_PROXY || 
         process.env.HTTP_PROXY || 
         undefined;
}

export async function proxyAwareFetch(url: string, options: RequestInit = {}): Promise<Response> {
  const proxyUrl = getProxyUrl();

  if (proxyUrl) {
    const proxyAgent = new ProxyAgent(proxyUrl);
    const undiciOptions: UndiciRequestOptions = {
      ...options,
      dispatcher: proxyAgent,
    };
    const response = await undiciFetch(url, undiciOptions);
    return response as unknown as Response;
  }

  return fetch(url, options);
}

export function validateMessages(messages: unknown, toolName: string): asserts messages is Message[] {
  if (!Array.isArray(messages)) {
    throw new Error(`Invalid arguments for ${toolName}: 'messages' must be an array`);
  }

  for (let i = 0; i < messages.length; i++) {
    const msg = messages[i];
    if (!msg || typeof msg !== 'object') {
      throw new Error(`Invalid message at index ${i}: must be an object`);
    }
    if (!msg.role || typeof msg.role !== 'string') {
      throw new Error(`Invalid message at index ${i}: 'role' must be a string`);
    }
    if (msg.content === undefined || msg.content === null || typeof msg.content !== 'string') {
      throw new Error(`Invalid message at index ${i}: 'content' must be a string`);
    }
  }
}

export async function performChatCompletion(
  messages: Message[],
  serviceOrigin?: string
): Promise<string> {
  if (!PERPLEXITY_API_KEY) {
    throw new Error("PERPLEXITY_API_KEY environment variable is required");
  }

  // Read timeout fresh each time to respect env var changes
  const TIMEOUT_MS = parseInt(process.env.PERPLEXITY_TIMEOUT_MS || "300000", 10);

  const apiEndpoint = process.env.API_ENDPOINT || DEFAULT_API_ENDPOINT;
  const model = process.env.MODEL || DEFAULT_MODEL;
  const url = new URL(apiEndpoint);
  const body = {
    model: model,
    messages: messages,
  };

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), TIMEOUT_MS);

  let response;
  try {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${PERPLEXITY_API_KEY}`,
    };
    if (serviceOrigin) {
      headers["X-Service"] = serviceOrigin;
    }
    response = await proxyAwareFetch(url.toString(), {
      method: "POST",
      headers,
      body: JSON.stringify(body),
      signal: controller.signal,
    });
    clearTimeout(timeoutId);
  } catch (error) {
    clearTimeout(timeoutId);
    if (error instanceof Error && error.name === "AbortError") {
      throw new Error(`Request timeout: API endpoint did not respond within ${TIMEOUT_MS}ms. Consider increasing PERPLEXITY_TIMEOUT_MS.`);
    }
    throw new Error(`Network error while calling API endpoint: ${error}`);
  }

  if (!response.ok) {
    let errorText;
    try {
      errorText = await response.text();
    } catch (parseError) {
      errorText = "Unable to parse error response";
    }
    throw new Error(
      `API error: ${response.status} ${response.statusText}\n${errorText}`
    );
  }

  let data: ChatCompletionResponse;
  try {
    const json = await response.json();
    data = ChatCompletionResponseSchema.parse(json);
  } catch (error) {
    if (error instanceof z.ZodError) {
      const issues = error.issues;
      if (issues.some(i => i.path.includes('message') || i.path.includes('content'))) {
        throw new Error("Invalid API response: missing message content");
      }
      if (issues.some(i => i.path.includes('choices'))) {
        throw new Error("Invalid API response: missing or empty choices array");
      }
    }
    throw new Error(`Failed to parse JSON response from API endpoint: ${error}`);
  }

  const firstChoice = data.choices[0];

  let messageContent = firstChoice.message.content;

  if (data.citations && Array.isArray(data.citations) && data.citations.length > 0) {
    messageContent += "\n\nCitations:\n";
    data.citations.forEach((citation, index) => {
      messageContent += `[${index + 1}] ${citation}\n`;
    });
  }

  return messageContent;
}

export function createPerplexityServer(serviceOrigin?: string) {
  const server = new McpServer({
    name: "io.github.zhangyu1818/server-perplexity-ask",
    version: "0.6.1",
  });

  const messageSchema = z.object({
    role: z.string().describe("Role of the message (e.g., system, user, assistant)"),
    content: z.string().describe("The content of the message"),
  });
  
  const messagesField = z.array(messageSchema).describe("Array of conversation messages");
  
  const responseOutputSchema = {
    response: z.string().describe("The response from the chat completion API"),
  };

  // Input schemas
  const messagesOnlyInputSchema = { messages: messagesField };

  server.registerTool(
    "perplexity_ask",
    {
      title: "Ask Perplexity",
      description: "Engages in a conversation using the configured API endpoint. " +
        "Accepts an array of messages (each with a role and content) " +
        "and returns a chat completion response from the selected model.",
      inputSchema: messagesOnlyInputSchema as any,
      outputSchema: responseOutputSchema as any,
      annotations: {
        readOnlyHint: true,
        openWorldHint: true,
      },
    },
    async (args: any) => {
      const { messages } = args as { messages: Message[] };
      validateMessages(messages, "perplexity_ask");
      const result = await performChatCompletion(messages, serviceOrigin);
      return {
        content: [{ type: "text" as const, text: result }],
        structuredContent: { response: result },
      };
    }
  );

  return server.server;
}
