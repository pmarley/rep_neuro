import type { ChatMessage, ChatSession } from "@shared/schema";

// Interface para serviço de IA (Dependency Inversion Principle)
export interface IAIService {
  generateResponse(userMessage: string, userId: string, sessionId: string, context?: ChatMessage[], metadata?: any): Promise<string>;
  validateMessageContent(message: string): boolean;
  getPersonalizedResponse(message: string, userHistory: ChatMessage[]): Promise<string>;
}

// Interface para serviço de chat (Dependency Inversion Principle)
export interface IChatService {
  createSession(userId?: string): Promise<ChatSession>;
  getOrCreateSession(userId: string, sessionToken?: string): Promise<ChatSession>;
  addMessage(sessionId: string, userId: string, content: string, isUser: boolean): Promise<ChatMessage>;
  getMessages(sessionId: string): Promise<ChatMessage[]>;
  validateSession(sessionToken: string): Promise<boolean>;
}

// Interface para logging estruturado
export interface ILogger {
  info(message: string, meta?: Record<string, any>): void;
  error(message: string, error?: Error, meta?: Record<string, any>): void;
  warn(message: string, meta?: Record<string, any>): void;
  debug(message: string, meta?: Record<string, any>): void;
}

// Interface para validação de entrada
export interface IInputValidator {
  validateMessage(message: string): ValidationResult;
  sanitizeInput(input: string): string;
}

export interface ValidationResult {
  isValid: boolean;
  sanitizedMessage?: string;
  error?: string;
}