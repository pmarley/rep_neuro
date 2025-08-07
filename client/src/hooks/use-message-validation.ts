import { useState, useCallback, useMemo } from "react";
import { validateMessage, validateMessageLive, type ValidationResult } from "@/lib/chat-validation";

// Hook especializado para validação de mensagens seguindo Single Responsibility
export function useMessageValidation() {
  const [currentMessage, setCurrentMessage] = useState("");
  
  // Validação em tempo real memoizada
  const liveValidation = useMemo(() => {
    return validateMessageLive(currentMessage);
  }, [currentMessage]);
  
  // Função de validação final memoizada
  const validateFinal = useCallback((message: string): ValidationResult => {
    return validateMessage(message);
  }, []);
  
  // Atualiza mensagem com validação
  const updateMessage = useCallback((message: string) => {
    if (message.length <= 500) {
      setCurrentMessage(message);
    }
  }, []);
  
  // Limpa mensagem
  const clearMessage = useCallback(() => {
    setCurrentMessage("");
  }, []);
  
  return {
    currentMessage,
    liveValidation,
    updateMessage,
    clearMessage,
    validateFinal,
    canSubmit: liveValidation.isValid && currentMessage.trim().length > 0,
  };
}