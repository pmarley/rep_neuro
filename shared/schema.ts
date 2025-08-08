import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Tabela simplificada de sessões com identificador único para cada usuário
export const chatSessions = pgTable("chat_sessions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: text("user_id").notNull().unique(), // Identificador único para cada usuário
  sessionToken: text("session_token").notNull().unique(),
  createdAt: timestamp("created_at").defaultNow(),
  isActive: boolean("is_active").default(true),
});

export const chatMessages = pgTable("chat_messages", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  sessionId: varchar("session_id").notNull(),
  userId: text("user_id").notNull(), // Adicionar userId para melhor rastreamento
  content: text("content").notNull(),
  isUser: boolean("is_user").notNull(),
  timestamp: timestamp("timestamp").defaultNow(),
});

export const insertChatSessionSchema = createInsertSchema(chatSessions).omit({
  id: true,
  createdAt: true,
});

export const insertChatMessageSchema = createInsertSchema(chatMessages).omit({
  id: true,
  timestamp: true,
});

// Schema melhorado para requests do chat com mais dados para o webhook
export const chatMessageRequestSchema = z.object({
  message: z.string().min(1).max(1000),
  sessionToken: z.string().nullable().optional(),
  userId: z.string().optional(),
  timestamp: z.string().optional(),
});

// Schema para payload do webhook com dados enriquecidos
export const webhookPayloadSchema = z.object({
  message: z.string(),
  userId: z.string(),
  sessionId: z.string(),
  timestamp: z.string(),
  conversationHistory: z.array(z.object({
    content: z.string(),
    isUser: z.boolean(),
    timestamp: z.string(),
  })).optional(),
  metadata: z.object({
    userAgent: z.string().optional(),
    ip: z.string().optional(),
    platform: z.string().optional(),
  }).optional(),
});

export type ChatSession = typeof chatSessions.$inferSelect;
export type ChatMessage = typeof chatMessages.$inferSelect;
export type InsertChatSession = z.infer<typeof insertChatSessionSchema>;
export type InsertChatMessage = z.infer<typeof insertChatMessageSchema>;
export type ChatMessageRequest = z.infer<typeof chatMessageRequestSchema>;
export type WebhookPayload = z.infer<typeof webhookPayloadSchema>;
