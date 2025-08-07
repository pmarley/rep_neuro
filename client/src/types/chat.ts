export interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

export interface ChatResponse {
  reply: string;
  sessionToken: string;
}

export interface ChatHistoryResponse {
  messages: Message[];
}

export interface ChatError {
  error: string;
  code?: string;
  requestId?: string;
  details?: any[];
}
