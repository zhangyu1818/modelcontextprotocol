import type { ProxyAgent } from "undici";

export interface Message {
  role: string;
  content: string;
}

export interface ChatMessage {
  content: string;
  role?: string;
}

export interface ChatChoice {
  message: ChatMessage;
  finish_reason?: string;
  index?: number;
}

export interface TokenUsage {
  prompt_tokens?: number;
  completion_tokens?: number;
  total_tokens?: number;
}

export interface ChatCompletionResponse {
  choices: ChatChoice[];
  citations?: string[];
  usage?: TokenUsage;
  id?: string;
  model?: string;
  created?: number;
}

export interface UndiciRequestOptions {
  [key: string]: unknown;
  dispatcher?: ProxyAgent;
}
