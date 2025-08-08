import { type ChatSession, type InsertChatSession, type ChatMessage, type InsertChatMessage } from "@shared/schema";
import { randomUUID } from "crypto";

// Interface simplificada focada apenas em sessões e mensagens
export interface IStorage {
  getChatSession(sessionToken: string): Promise<ChatSession | undefined>;
  getOrCreateChatSession(userId: string, sessionToken?: string): Promise<ChatSession>;
  createChatSession(session: InsertChatSession): Promise<ChatSession>;
  updateChatSession(sessionToken: string, updates: Partial<ChatSession>): Promise<ChatSession | undefined>;
  
  getChatMessages(sessionId: string): Promise<ChatMessage[]>;
  createChatMessage(message: InsertChatMessage): Promise<ChatMessage>;
}

export class MemStorage implements IStorage {
  private chatSessions: Map<string, ChatSession>;
  private chatMessages: Map<string, ChatMessage>;

  constructor() {
    this.chatSessions = new Map();
    this.chatMessages = new Map();
  }

  async getChatSession(sessionToken: string): Promise<ChatSession | undefined> {
    return Array.from(this.chatSessions.values()).find(
      (session) => session.sessionToken === sessionToken
    );
  }

  async getOrCreateChatSession(userId: string, sessionToken?: string): Promise<ChatSession> {
    // Se tem sessionToken, tenta encontrar a sessão existente
    if (sessionToken) {
      const existingSession = await this.getChatSession(sessionToken);
      if (existingSession && existingSession.userId === userId) {
        return existingSession;
      }
    }

    // Cria nova sessão
    const newSessionToken = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const newSession: InsertChatSession = {
      userId,
      sessionToken: newSessionToken,
      isActive: true,
    };
    
    return await this.createChatSession(newSession);
  }

  async createChatSession(insertSession: InsertChatSession): Promise<ChatSession> {
    const id = randomUUID();
    const session: ChatSession = {
      id,
      sessionToken: insertSession.sessionToken,
      userId: insertSession.userId,
      createdAt: new Date(),
      isActive: insertSession.isActive ?? true,
    };
    this.chatSessions.set(id, session);
    return session;
  }

  async updateChatSession(sessionToken: string, updates: Partial<ChatSession>): Promise<ChatSession | undefined> {
    const session = await this.getChatSession(sessionToken);
    if (!session) return undefined;
    
    const updatedSession = { ...session, ...updates };
    this.chatSessions.set(session.id, updatedSession);
    return updatedSession;
  }

  async getChatMessages(sessionId: string): Promise<ChatMessage[]> {
    return Array.from(this.chatMessages.values())
      .filter((message) => message.sessionId === sessionId)
      .sort((a, b) => (a.timestamp?.getTime() || 0) - (b.timestamp?.getTime() || 0));
  }

  async createChatMessage(insertMessage: InsertChatMessage): Promise<ChatMessage> {
    const id = randomUUID();
    const message: ChatMessage = {
      ...insertMessage,
      id,
      timestamp: new Date(),
    };
    this.chatMessages.set(id, message);
    return message;
  }
}

export const storage = new MemStorage();
