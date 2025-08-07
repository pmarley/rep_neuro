import { z } from "zod";
import type { IInputValidator, ValidationResult } from "./interfaces";
import { logger } from "./logger";

// Implementação do validador seguindo Single Responsibility Principle
export class InputValidator implements IInputValidator {
  private readonly messageSchema = z.string()
    .min(1, "Mensagem não pode estar vazia")
    .max(500, "Mensagem muito longa (máximo 500 caracteres)")
    .refine(msg => msg.trim().length > 0, "Mensagem não pode conter apenas espaços");

  private readonly dangerousPatterns = [
    /<script[^>]*>.*?<\/script>/gi,
    /<iframe[^>]*>.*?<\/iframe>/gi,
    /javascript:/gi,
    /on\w+\s*=/gi,
    /<[^>]*>/g, // Remove todas as tags HTML
  ];

  validateMessage(message: string): ValidationResult {
    try {
      // Validação com Zod
      const validatedMessage = this.messageSchema.parse(message);
      
      // Sanitização
      const sanitizedMessage = this.sanitizeInput(validatedMessage);
      
      // Verifica se ainda é válido após sanitização
      if (sanitizedMessage.trim().length === 0) {
        return {
          isValid: false,
          error: "Mensagem contém apenas conteúdo inválido"
        };
      }
      
      logger.debug("Message validated successfully", {
        originalLength: message.length,
        sanitizedLength: sanitizedMessage.length
      });
      
      return {
        isValid: true,
        sanitizedMessage
      };
    } catch (error) {
      const errorMessage = error instanceof z.ZodError 
        ? error.errors[0]?.message || "Mensagem inválida"
        : "Erro na validação da mensagem";
      
      logger.warn("Message validation failed", {
        error: errorMessage,
        originalMessage: message.substring(0, 100) // Log apenas os primeiros 100 chars por segurança
      });
      
      return {
        isValid: false,
        error: errorMessage
      };
    }
  }

  sanitizeInput(input: string): string {
    let sanitized = input.trim();
    
    // Remove padrões perigosos
    this.dangerousPatterns.forEach(pattern => {
      sanitized = sanitized.replace(pattern, '');
    });
    
    // Codifica caracteres especiais
    sanitized = sanitized
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#x27;')
      .replace(/\//g, '&#x2F;');
    
    // Remove quebras de linha múltiplas
    sanitized = sanitized.replace(/\n{3,}/g, '\n\n');
    
    return sanitized;
  }
}

// Singleton para uso global
export const inputValidator = new InputValidator();