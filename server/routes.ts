import type { Express } from "express";
import { createServer, type Server } from "http";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import { z } from "zod";
import { storage } from "./storage";
import { chatMessageRequestSchema } from "@shared/schema";
import { ChatService } from "./services/chat-service";
import { AIService } from "./services/ai-service";
import { InputValidator } from "./services/input-validator";
import { logger } from "./services/logger";

// Dependency Injection - Criação dos serviços
const chatService = new ChatService(storage);
const aiService = new AIService();
const inputValidator = new InputValidator();

// Rate limiting melhorado para chat messages
const chatRateLimit = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minuto
  max: 15, // máximo 15 requests por minuto por IP
  message: { 
    error: "Muitas mensagens enviadas. Aguarde um momento antes de tentar novamente.",
    code: "RATE_LIMIT_EXCEEDED"
  },
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    logger.warn("Rate limit exceeded", {
      ip: req.ip,
      userAgent: req.get('User-Agent'),
      path: req.path
    });
    res.status(429).json({
      error: "Muitas mensagens enviadas. Aguarde um momento antes de tentar novamente.",
      code: "RATE_LIMIT_EXCEEDED"
    });
  }
});

// Rate limiting geral para APIs
const generalRateLimit = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minuto
  max: 100, // máximo 100 requests por minuto por IP
  message: { 
    error: "Muitas requisições. Tente novamente em alguns instantes.",
    code: "GENERAL_RATE_LIMIT_EXCEEDED"
  },
  standardHeaders: true,
  legacyHeaders: false,
});

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Configurar trust proxy para funcionar corretamente com rate limiting
  app.set('trust proxy', 1);
  
  // Security middleware robusto
  app.use(helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'"],
        styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com", "https://cdnjs.cloudflare.com"],
        fontSrc: ["'self'", "https://fonts.gstatic.com", "https://cdnjs.cloudflare.com"],
        imgSrc: ["'self'", "data:", "https:"],
        connectSrc: ["'self'"],
        frameAncestors: ["'none'"],
        objectSrc: ["'none'"],
        upgradeInsecureRequests: [],
      },
    },
    hsts: {
      maxAge: 31536000,
      includeSubDomains: true,
      preload: true
    },
    noSniff: true,
    frameguard: { action: 'deny' },
    xssFilter: true,
  }));

  // Rate limiting geral para todas as rotas da API
  app.use('/api/', generalRateLimit);

  // Chat message endpoint com validação e serviços SOLID
  app.post("/api/chat/message", chatRateLimit, async (req, res) => {
    const requestId = `req-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    try {
      logger.info("Chat message request received", {
        requestId,
        ip: req.ip,
        userAgent: req.get('User-Agent')
      });

      // Validação de schema com Zod
      const validation = chatMessageRequestSchema.safeParse(req.body);
      if (!validation.success) {
        logger.warn("Invalid request schema", {
          requestId,
          errors: validation.error.issues
        });
        return res.status(400).json({ 
          error: "Dados da requisição inválidos", 
          details: validation.error.issues,
          code: "INVALID_REQUEST_SCHEMA"
        });
      }

      const { message, sessionToken } = validation.data;
      
      // Validação e sanitização de entrada
      const inputValidation = inputValidator.validateMessage(message);
      if (!inputValidation.isValid) {
        logger.warn("Message validation failed", {
          requestId,
          error: inputValidation.error
        });
        return res.status(400).json({ 
          error: inputValidation.error,
          code: "INVALID_MESSAGE_CONTENT"
        });
      }

      const sanitizedMessage = inputValidation.sanitizedMessage!;

      // Validação adicional de conteúdo de IA
      if (!aiService.validateMessageContent(sanitizedMessage)) {
        logger.warn("AI content validation failed", {
          requestId,
          messageLength: sanitizedMessage.length
        });
        return res.status(400).json({ 
          error: "Por favor, forneça uma mensagem mais detalhada sobre seu negócio",
          code: "MESSAGE_TOO_SIMPLE"
        });
      }

      // Recuperar ou criar sessão
      const session = await chatService.getOrCreateSession(sessionToken);
      
      // Buscar histórico para contexto
      const messageHistory = await chatService.getMessages(session.id);
      
      // Salvar mensagem do usuário
      await chatService.addMessage(session.id, sanitizedMessage, true);

      // Gerar resposta da IA com contexto
      const aiResponse = await aiService.generateResponse(sanitizedMessage, messageHistory);
      
      // Salvar resposta da IA
      await chatService.addMessage(session.id, aiResponse, false);

      logger.info("Chat message processed successfully", {
        requestId,
        sessionId: session.id,
        messageLength: sanitizedMessage.length,
        responseLength: aiResponse.length
      });

      res.json({
        reply: aiResponse,
        sessionToken: session.sessionToken,
        timestamp: new Date().toISOString()
      });

    } catch (error) {
      logger.error("Chat message processing failed", error as Error, {
        requestId,
        ip: req.ip
      });
      
      res.status(500).json({ 
        error: "Erro interno do servidor. Tente novamente em alguns instantes.",
        code: "INTERNAL_SERVER_ERROR",
        requestId
      });
    }
  });

  // Get chat history endpoint com validação aprimorada
  app.get("/api/chat/history/:sessionToken", async (req, res) => {
    const requestId = `hist-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    try {
      const { sessionToken } = req.params;
      
      logger.info("Chat history request received", {
        requestId,
        sessionToken: sessionToken?.substring(0, 8) + '...', // Log parcial por segurança
        ip: req.ip
      });
      
      // Validação do token de sessão
      if (!sessionToken || typeof sessionToken !== 'string' || sessionToken.length < 10) {
        logger.warn("Invalid session token format", { requestId });
        return res.status(400).json({ 
          error: "Token de sessão inválido",
          code: "INVALID_SESSION_TOKEN"
        });
      }

      // Validar sessão
      const isValidSession = await chatService.validateSession(sessionToken);
      if (!isValidSession) {
        logger.warn("Session validation failed", { requestId });
        return res.status(404).json({ 
          error: "Sessão não encontrada ou expirada",
          code: "SESSION_NOT_FOUND"
        });
      }

      // Buscar sessão
      const session = await storage.getChatSession(sessionToken);
      if (!session) {
        return res.status(404).json({ 
          error: "Sessão não encontrada",
          code: "SESSION_NOT_FOUND"
        });
      }

      // Buscar mensagens
      const messages = await chatService.getMessages(session.id);
      
      logger.info("Chat history retrieved successfully", {
        requestId,
        sessionId: session.id,
        messageCount: messages.length
      });

      res.json({ 
        messages,
        sessionInfo: {
          id: session.id,
          createdAt: session.createdAt,
          isActive: session.isActive
        }
      });

    } catch (error) {
      logger.error("Chat history retrieval failed", error as Error, {
        requestId,
        ip: req.ip
      });
      
      res.status(500).json({ 
        error: "Falha ao recuperar histórico de conversas",
        code: "INTERNAL_SERVER_ERROR",
        requestId
      });
    }
  });

  // Health check endpoint
  app.get("/api/health", (req, res) => {
    res.json({
      status: "OK",
      timestamp: new Date().toISOString(),
      version: "1.0.0"
    });
  });

  const httpServer = createServer(app);
  return httpServer;
}
