import type { IChatService } from "./interfaces";
import type { ChatSession, ChatMessage, InsertChatSession, InsertChatMessage } from "@shared/schema";
import type { IStorage } from "../storage";
import { logger } from "./logger";
import { randomUUID } from "crypto";

// Implementação do serviço de chat seguindo Single Responsibility Principle
export class ChatService implements IChatService {
  constructor(private storage: IStorage) {}

  async createSession(userId?: string): Promise<ChatSession> {
    try {
      const sessionToken = randomUUID();
      const sessionData: InsertChatSession = {
        sessionToken,
        userId: userId || `anonymous_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      };
      
      const session = await this.storage.createChatSession(sessionData);
      
      logger.info("Chat session created", {
        sessionId: session.id,
        sessionToken: session.sessionToken,
        userId: userId || 'anonymous'
      });
      
      return session;
    } catch (error) {
      logger.error("Failed to create chat session", error as Error);
      throw new Error("Falha ao criar sessão de chat");
    }
  }

  async getOrCreateSession(userId: string, sessionToken?: string): Promise<ChatSession> {
    try {
      logger.debug("Getting or creating chat session", { userId, sessionToken });
      return await this.storage.getOrCreateChatSession(userId, sessionToken);
    } catch (error) {
      logger.error("Failed to get or create chat session", error as Error, { userId, sessionToken });
      throw new Error("Falha ao recuperar sessão de chat");
    }
  }

  async addMessage(sessionId: string, userId: string, content: string, isUser: boolean): Promise<ChatMessage> {
    try {
      const messageData: InsertChatMessage = {
        sessionId,
        userId,
        content,
        isUser,
      };
      
      const message = await this.storage.createChatMessage(messageData);
      
      logger.info("Chat message added", {
        messageId: message.id,
        sessionId,
        userId,
        isUser,
        contentLength: content.length
      });
      
      return message;
    } catch (error) {
      logger.error("Failed to add chat message", error as Error, {
        sessionId,
        isUser,
        contentLength: content.length
      });
      throw new Error("Falha ao salvar mensagem");
    }
  }

  async getMessages(sessionId: string): Promise<ChatMessage[]> {
    try {
      const messages = await this.storage.getChatMessages(sessionId);
      
      logger.debug("Retrieved chat messages", {
        sessionId,
        messageCount: messages.length
      });
      
      return messages;
    } catch (error) {
      logger.error("Failed to get chat messages", error as Error, { sessionId });
      throw new Error("Falha ao recuperar mensagens");
    }
  }

  async validateSession(sessionToken: string): Promise<boolean> {
    try {
      const session = await this.storage.getChatSession(sessionToken);
      
      if (!session) {
        logger.warn("Session not found", { sessionToken });
        return false;
      }
      
      if (!session.isActive) {
        logger.warn("Session is inactive", { sessionToken, sessionId: session.id });
        return false;
      }
      
      // Verifica se a sessão não é muito antiga (24 horas)
      const sessionAge = Date.now() - (session.createdAt?.getTime() || 0);
      const maxAge = 24 * 60 * 60 * 1000; // 24 horas
      
      if (sessionAge > maxAge) {
        logger.warn("Session expired", {
          sessionToken,
          sessionId: session.id,
          ageHours: Math.round(sessionAge / (60 * 60 * 1000))
        });
        
        // Marca sessão como inativa
        await this.storage.updateChatSession(sessionToken, { isActive: false });
        return false;
      }
      
      return true;
    } catch (error) {
      logger.error("Failed to validate session", error as Error, { sessionToken });
      return false;
    }
  }
}