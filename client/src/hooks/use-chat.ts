import { useState, useCallback, useRef, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { validateMessage } from "@/lib/chat-validation";
import { useToast } from "@/hooks/use-toast";
import type { Message, ChatResponse, ChatError } from "@/types/chat";

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [sessionToken, setSessionToken] = useState<string | null>(null);
  const [unreadCount, setUnreadCount] = useState(1);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Add initial welcome message
  useEffect(() => {
    setMessages([{
      id: 'welcome',
      content: 'Olá! 👋 Sou o NeuroBotX Assistant. Como posso ajudar você a otimizar seu negócio hoje?',
      isUser: false,
      timestamp: new Date(),
    }]);
  }, []);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  const sendMessageMutation = useMutation<ChatResponse, ChatError, string>({
    mutationFn: async (message: string) => {
      const response = await apiRequest(
        "POST",
        "/api/chat/message",
        {
          message,
          sessionToken,
        }
      );
      return response.json();
    },
    onSuccess: (data) => {
      setSessionToken(data.sessionToken);
      
      // Add bot response
      const botMessage: Message = {
        id: `bot-${Date.now()}`,
        content: data.reply,
        isUser: false,
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);

      // Update unread count if chat is closed
      if (!isChatOpen) {
        setUnreadCount(prev => prev + 1);
      }
    },
    onError: (error) => {
      setIsTyping(false);
      toast({
        title: "Erro na comunicação",
        description: error.error || "Ocorreu um erro ao enviar a mensagem. Tente novamente.",
        variant: "destructive",
      });
    },
  });

  const sendMessage = useCallback((messageText: string) => {
    const validation = validateMessage(messageText);
    
    if (!validation.isValid) {
      toast({
        title: "Mensagem inválida",
        description: validation.error,
        variant: "destructive",
      });
      return;
    }

    // Add user message immediately
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      content: validation.sanitizedMessage!,
      isUser: true,
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);
    
    // Send to API
    sendMessageMutation.mutate(validation.sanitizedMessage!);
  }, [sendMessageMutation, toast]);

  const toggleChat = useCallback(() => {
    setIsChatOpen(prev => {
      const newState = !prev;
      if (newState) {
        setUnreadCount(0);
      }
      return newState;
    });
  }, []);

  const openChat = useCallback(() => {
    setIsChatOpen(true);
    setUnreadCount(0);
  }, []);

  const closeChat = useCallback(() => {
    setIsChatOpen(false);
  }, []);

  return {
    messages,
    isTyping,
    unreadCount,
    isChatOpen,
    isLoading: sendMessageMutation.isPending,
    sendMessage,
    toggleChat,
    openChat,
    closeChat,
    messagesEndRef,
  };
}
