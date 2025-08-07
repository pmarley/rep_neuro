import { useRef, useEffect, useCallback, memo } from "react";
import { Send, X, Bot, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useChat } from "@/hooks/use-chat";
import { useMessageValidation } from "@/hooks/use-message-validation";
import MessageBubble from "@/components/ui/message-bubble";

interface ChatInterfaceProps {
  isOpen: boolean;
  onClose: () => void;
}

const ChatInterface = memo(function ChatInterface({ isOpen, onClose }: ChatInterfaceProps) {
  const {
    messages,
    isTyping,
    isLoading,
    sendMessage,
    messagesEndRef,
  } = useChat();
  
  const {
    currentMessage,
    liveValidation,
    updateMessage,
    clearMessage,
    validateFinal,
    canSubmit
  } = useMessageValidation();
  
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    
    if (!canSubmit || isLoading) return;
    
    const validation = validateFinal(currentMessage);
    if (!validation.isValid) {
      return;
    }
    
    sendMessage(currentMessage);
    clearMessage();
  }, [canSubmit, isLoading, currentMessage, validateFinal, sendMessage, clearMessage]);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    updateMessage(e.target.value);
  }, [updateMessage]);

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-6 right-6 w-96 h-[32rem] glass rounded-3xl shadow-2xl shadow-black/50 z-40 flex flex-col overflow-hidden transform transition-all duration-500">
      {/* Chat Header */}
      <div className="glass-light border-b border-slate-700/50 p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-violet-500 rounded-full flex items-center justify-center">
            <Bot className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-slate-50">NeuroBotX Assistant</h3>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
              <span className="text-xs text-slate-400">Online</span>
            </div>
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={onClose}
          className="w-8 h-8 rounded-full hover:bg-slate-700/50 p-0"
          aria-label="Fechar chat"
        >
          <X className="w-4 h-4 text-slate-400 hover:text-slate-50" />
        </Button>
      </div>

      {/* Messages Area */}
      <div className="flex-1 p-4 overflow-y-auto custom-scrollbar space-y-4 bg-gradient-to-b from-dark-900/50 to-dark-950/50">
        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}
        
        {/* Typing Indicator */}
        {isTyping && (
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-violet-500 rounded-full flex items-center justify-center flex-shrink-0">
              <Bot className="w-4 h-4 text-white" />
            </div>
            <div className="glass-light rounded-2xl rounded-tl-sm p-3">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-slate-400 rounded-full animate-typing"></div>
                <div className="w-2 h-2 bg-slate-400 rounded-full animate-typing" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-2 h-2 bg-slate-400 rounded-full animate-typing" style={{ animationDelay: '0.4s' }}></div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="glass-light border-t border-slate-700/50 p-4">
        <form onSubmit={handleSubmit} className="flex items-center gap-3">
          <div className="flex-1 relative">
            <Input
              ref={inputRef}
              type="text"
              placeholder="Descreva sua necessidade de negócio..."
              value={currentMessage}
              onChange={handleInputChange}
              className="bg-slate-800/50 border-slate-700/50 rounded-xl pr-16 text-slate-50 placeholder-slate-400 focus:ring-primary-500/50 focus:border-primary-500/50"
              maxLength={500}
              autoComplete="off"
              aria-label="Campo de mensagem do chat"
              disabled={isLoading}
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
              {liveValidation.warning && (
                <AlertCircle 
                  className="w-4 h-4 text-yellow-500" 
                  title={liveValidation.warning}
                />
              )}
              <span className={`text-xs transition-colors ${
                liveValidation.charCount > 400 ? 'text-yellow-500' :
                liveValidation.charCount > 450 ? 'text-orange-500' :
                liveValidation.charCount >= 500 ? 'text-red-500' :
                'text-slate-500'
              }`}>
                {liveValidation.charCount}/{liveValidation.maxChars}
              </span>
            </div>
          </div>
          
          <Button
            type="submit"
            disabled={!canSubmit}
            className="w-12 h-12 bg-gradient-to-r from-primary-500 to-violet-500 rounded-xl p-0 hover:scale-105 transition-all duration-200 focus:ring-primary-500/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            aria-label="Enviar mensagem"
            title={!canSubmit ? liveValidation.warning || "Complete sua mensagem" : "Enviar mensagem"}
          >
            <Send className="w-4 h-4 text-white" />
          </Button>
        </form>
      </div>
    </div>
  );
});

export default ChatInterface;
