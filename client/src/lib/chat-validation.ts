import { z } from "zod";

export const messageValidationSchema = z.object({
  message: z
    .string()
    .min(1, "A mensagem não pode estar vazia")
    .max(500, "A mensagem deve ter no máximo 500 caracteres")
    .refine(
      (value) => value.trim().length > 0,
      "A mensagem não pode conter apenas espaços"
    ),
});

export function sanitizeMessage(message: string): string {
  return message
    .trim()
    .replace(/[<>]/g, '')
    .substring(0, 500);
}

export function validateMessage(message: string): { isValid: boolean; error?: string; sanitizedMessage?: string } {
  const sanitized = sanitizeMessage(message);
  const result = messageValidationSchema.safeParse({ message: sanitized });
  
  if (!result.success) {
    return {
      isValid: false,
      error: result.error.issues[0]?.message || "Mensagem inválida",
    };
  }
  
  return {
    isValid: true,
    sanitizedMessage: sanitized,
  };
}
