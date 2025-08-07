import { z } from "zod";

export interface ValidationResult {
  isValid: boolean;
  sanitizedMessage?: string;
  error?: string;
  code?: string;
}

// Schema aprimorado seguindo as mesmas regras do backend
export const messageValidationSchema = z.object({
  message: z
    .string()
    .min(1, "Mensagem não pode estar vazia")
    .max(500, "Mensagem muito longa (máximo 500 caracteres)")
    .refine(
      (value) => value.trim().length > 0,
      "Mensagem não pode conter apenas espaços"
    )
    .refine(
      (value) => value.trim().length >= 3,
      "Mensagem muito curta (mínimo 3 caracteres)"
    ),
});

const dangerousPatterns = [
  /<script[^>]*>.*?<\/script>/gi,
  /<iframe[^>]*>.*?<\/iframe>/gi,
  /javascript:/gi,
  /on\w+\s*=/gi,
  /<[^>]*>/g, // Remove todas as tags HTML
];

export function sanitizeMessage(message: string): string {
  let sanitized = message.trim();
  
  // Remove padrões perigosos
  dangerousPatterns.forEach(pattern => {
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
  
  // Remove quebras de linha múltiplas e limita tamanho
  sanitized = sanitized.replace(/\n{3,}/g, '\n\n').substring(0, 500);
  
  return sanitized;
}

export function validateMessage(message: string): ValidationResult {
  try {
    const sanitized = sanitizeMessage(message);
    const result = messageValidationSchema.safeParse({ message: sanitized });
    
    if (!result.success) {
      return {
        isValid: false,
        error: result.error.issues[0]?.message || "Mensagem inválida",
        code: "VALIDATION_ERROR"
      };
    }
    
    // Verifica se a mensagem não é muito simples
    const tooSimple = /^(oi|olá|ok|sim|não|obrigado|tchau)$/i.test(sanitized.toLowerCase());
    if (tooSimple) {
      return {
        isValid: false,
        error: "Por favor, descreva melhor sua necessidade de negócio",
        code: "TOO_SIMPLE"
      };
    }
    
    return {
      isValid: true,
      sanitizedMessage: sanitized,
    };
  } catch (error) {
    return {
      isValid: false,
      error: "Erro na validação da mensagem",
      code: "VALIDATION_ERROR"
    };
  }
}

// Função para validação em tempo real
export function validateMessageLive(message: string): {
  isValid: boolean;
  warning?: string;
  charCount: number;
  maxChars: number;
} {
  const charCount = message.length;
  const maxChars = 500;
  
  if (charCount === 0) {
    return {
      isValid: false,
      charCount,
      maxChars
    };
  }
  
  if (charCount > maxChars) {
    return {
      isValid: false,
      warning: "Mensagem muito longa",
      charCount,
      maxChars
    };
  }
  
  if (charCount < 3) {
    return {
      isValid: false,
      warning: "Mensagem muito curta",
      charCount,
      maxChars
    };
  }
  
  return {
    isValid: true,
    charCount,
    maxChars
  };
}
