import { memo } from "react";
import { Bot, User } from "lucide-react";
import type { Message } from "@/types/chat";

interface MessageBubbleProps {
  message: Message;
}

// Componente otimizado para mensagens individuais
const MessageBubble = memo(function MessageBubble({ message }: MessageBubbleProps) {
  return (
    <div 
      className={`flex items-start gap-3 animate-fade-in ${
        message.isUser ? 'flex-row-reverse' : ''
      }`}
    >
      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
        message.isUser 
          ? 'bg-gradient-to-r from-slate-600 to-slate-700' 
          : 'bg-gradient-to-r from-primary-500 to-violet-500'
      }`}>
        {message.isUser ? (
          <User className="w-4 h-4 text-white" />
        ) : (
          <Bot className="w-4 h-4 text-white" />
        )}
      </div>
      <div className={`glass-light rounded-2xl p-3 max-w-xs ${
        message.isUser ? 'rounded-tr-sm' : 'rounded-tl-sm'
      }`}>
        <p className="text-sm text-foreground dark:text-slate-50 whitespace-pre-wrap break-words">
          {message.content}
        </p>
        <div className="text-xs text-muted-foreground dark:text-slate-400 mt-1 opacity-70">
          {message.timestamp.toLocaleTimeString('pt-BR', {
            hour: '2-digit',
            minute: '2-digit'
          })}
        </div>
      </div>
    </div>
  );
});

export default MessageBubble;