import { z } from "zod";

export const ChatMessageSchema = z.object({
  content: z.string(),
  role: z.string().optional(),
});

export const ChatChoiceSchema = z.object({
  message: ChatMessageSchema,
  finish_reason: z.string().optional(),
  index: z.number().optional(),
});

export const TokenUsageSchema = z.object({
  prompt_tokens: z.number().optional(),
  completion_tokens: z.number().optional(),
  total_tokens: z.number().optional(),
});

export const ChatCompletionResponseSchema = z.object({
  choices: z.array(ChatChoiceSchema).min(1),
  citations: z.array(z.string()).optional(),
  usage: TokenUsageSchema.optional(),
  id: z.string().optional(),
  model: z.string().optional(),
  created: z.number().optional(),
});
