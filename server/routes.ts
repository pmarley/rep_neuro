import type { Express } from "express";
import { createServer, type Server } from "http";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import { z } from "zod";
import { storage } from "./storage";
import { chatMessageRequestSchema } from "@shared/schema";
import { randomUUID } from "crypto";

// Rate limiting for chat messages
const chatRateLimit = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 10, // limit each IP to 10 requests per windowMs
  message: { error: "Too many chat messages. Please slow down." },
  standardHeaders: true,
  legacyHeaders: false,
});

// Input sanitization
function sanitizeMessage(message: string): string {
  return message
    .trim()
    .replace(/[<>]/g, '')
    .substring(0, 500);
}

// Mock AI response generator
function generateAIResponse(userMessage: string): string {
  const responses = [
    "Entendo sua necessidade. Vamos analisar os dados do seu negócio para identificar oportunidades de automação.",
    "Interessante! Com base no que você compartilhou, posso sugerir algumas estratégias para otimizar seus processos.",
    "Perfeito! Vou preparar um diagnóstico personalizado para sua situação. Pode me contar mais sobre seus principais desafios?",
    "Excelente pergunta! Nossa IA pode ajudar a automatizar esse processo e aumentar sua eficiência em até 80%.",
    "Baseado na sua descrição, identifiquei 3 oportunidades principais de melhoria. Gostaria que eu detalhe cada uma?",
    "Essa é uma situação comum que vemos em muitos negócios. Nossa solução de automação pode resolver isso de forma eficiente.",
    "Entendo perfeitamente. Deixe-me analisar seu caso e sugerir as melhores práticas de automação para sua situação.",
  ];
  
  // Simple keyword-based response selection
  const lowerMessage = userMessage.toLowerCase();
  
  if (lowerMessage.includes('vendas') || lowerMessage.includes('vender')) {
    return "Vendas são cruciais! Nossa IA pode automatizar seu funil de vendas e aumentar suas conversões em até 60%. Que tipo de produtos/serviços você vende?";
  }
  
  if (lowerMessage.includes('cliente') || lowerMessage.includes('atendimento')) {
    return "O atendimento ao cliente é fundamental! Posso ajudar a implementar chatbots inteligentes que respondem 24/7 e aumentam a satisfação dos clientes.";
  }
  
  if (lowerMessage.includes('processo') || lowerMessage.includes('operação')) {
    return "Otimização de processos é nossa especialidade! Nossa IA pode mapear seus fluxos atuais e sugerir automações que economizam tempo e recursos.";
  }
  
  return responses[Math.floor(Math.random() * responses.length)];
}

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Security middleware
  app.use(helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'"],
        styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com", "https://cdnjs.cloudflare.com"],
        fontSrc: ["'self'", "https://fonts.gstatic.com", "https://cdnjs.cloudflare.com"],
        imgSrc: ["'self'", "data:", "https:"],
        connectSrc: ["'self'"],
      },
    },
  }));

  // Chat message endpoint with rate limiting
  app.post("/api/chat/message", chatRateLimit, async (req, res) => {
    try {
      // Validate request body
      const validation = chatMessageRequestSchema.safeParse(req.body);
      if (!validation.success) {
        return res.status(400).json({ 
          error: "Invalid request", 
          details: validation.error.issues 
        });
      }

      const { message, sessionToken } = validation.data;
      const sanitizedMessage = sanitizeMessage(message);

      if (!sanitizedMessage) {
        return res.status(400).json({ error: "Message cannot be empty" });
      }

      // Get or create session
      let session;
      if (sessionToken) {
        session = await storage.getChatSession(sessionToken);
      }
      
      if (!session) {
        const newSessionToken = randomUUID();
        session = await storage.createChatSession({
          sessionToken: newSessionToken,
          userId: null,
        });
      }

      // Save user message
      await storage.createChatMessage({
        sessionId: session.id,
        content: sanitizedMessage,
        isUser: true,
      });

      // Generate AI response
      const aiResponse = generateAIResponse(sanitizedMessage);
      
      // Save AI response
      await storage.createChatMessage({
        sessionId: session.id,
        content: aiResponse,
        isUser: false,
      });

      // Simulate processing delay
      await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));

      res.json({
        reply: aiResponse,
        sessionToken: session.sessionToken,
      });

    } catch (error) {
      console.error("Chat error:", error);
      res.status(500).json({ 
        error: "Internal server error. Please try again later." 
      });
    }
  });

  // Get chat history endpoint
  app.get("/api/chat/history/:sessionToken", async (req, res) => {
    try {
      const { sessionToken } = req.params;
      
      if (!sessionToken) {
        return res.status(400).json({ error: "Session token is required" });
      }

      const session = await storage.getChatSession(sessionToken);
      if (!session) {
        return res.status(404).json({ error: "Session not found" });
      }

      const messages = await storage.getChatMessages(session.id);
      res.json({ messages });

    } catch (error) {
      console.error("Chat history error:", error);
      res.status(500).json({ 
        error: "Failed to retrieve chat history" 
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
