import { useCallback } from "react";
import { useToast } from "@/hooks/use-toast";
import type { ChatError } from "@/types/chat";

// Hook especializado para tratamento de erros seguindo Single Responsibility
export function useErrorHandling() {
  const { toast } = useToast();
  
  const handleChatError = useCallback((error: ChatError) => {
    let errorMessage = "Ocorreu um erro inesperado. Tente novamente.";
    let errorTitle = "Erro";
    
    // Tratamento específico por código de erro
    switch (error.code) {
      case "RATE_LIMIT_EXCEEDED":
        errorTitle = "Limite de mensagens";
        errorMessage = "Muitas mensagens enviadas. Aguarde um momento antes de tentar novamente.";
        break;
        
      case "INVALID_MESSAGE_CONTENT":
        errorTitle = "Mensagem inválida";
        errorMessage = error.error || "Verifique o conteúdo da sua mensagem.";
        break;
        
      case "MESSAGE_TOO_SIMPLE":
        errorTitle = "Mensagem muito simples";
        errorMessage = error.error || "Por favor, descreva melhor sua necessidade de negócio.";
        break;
        
      case "SESSION_NOT_FOUND":
        errorTitle = "Sessão expirada";
        errorMessage = "Sua sessão expirou. A conversa será reiniciada.";
        break;
        
      case "INTERNAL_SERVER_ERROR":
        errorTitle = "Erro do servidor";
        errorMessage = "Problema interno do servidor. Tente novamente em alguns instantes.";
        break;
        
      default:
        errorMessage = error.error || errorMessage;
    }
    
    toast({
      title: errorTitle,
      description: errorMessage,
      variant: "destructive",
    });
  }, [toast]);
  
  const handleNetworkError = useCallback(() => {
    toast({
      title: "Erro de conexão",
      description: "Verifique sua conexão com a internet e tente novamente.",
      variant: "destructive",
    });
  }, [toast]);
  
  const handleValidationError = useCallback((message: string) => {
    toast({
      title: "Mensagem inválida",
      description: message,
      variant: "destructive",
    });
  }, [toast]);
  
  return {
    handleChatError,
    handleNetworkError,
    handleValidationError,
  };
}