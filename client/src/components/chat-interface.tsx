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
    <div className="fixed bottom-4 right-4 w-[90vw] max-w-md h-[70vh] max-h-[32rem] glass rounded-3xl shadow-2xl shadow-black/20 dark:shadow-black/50 z-40 flex flex-col overflow-hidden transform transition-all duration-500 sm:bottom-6 sm:right-6 sm:w-96 sm:h-[32rem]">
      {/* Chat Header */}
      <div className="glass-light border-b border-border/50 p-3 sm:p-4 flex items-center justify-between">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center">
            <Bot className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="font-semibold text-foreground text-sm sm:text-base truncate">NeuroBotX Assistant</h3>
            <div className="flex items-center gap-1 sm:gap-2">
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-emerald-400 rounded-full animate-pulse"></div>
              <span className="text-xs text-muted-foreground">Online</span>
            </div>
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={onClose}
          className="text-muted-foreground hover:text-foreground hover:bg-accent/10 h-8 w-8 sm:h-9 sm:w-9"
          data-testid="button-close-chat"
        >
          <X className="w-4 h-4" />
        </Button>
      </div>

      {/* Messages Area */}
      <div className="flex-1 p-3 sm:p-4 overflow-y-auto custom-scrollbar space-y-3 sm:space-y-4 bg-gradient-to-b from-background/50 to-muted/20">
        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}
        
        {/* Typing Indicator */}
        {isTyping && (
          <div className="flex items-start gap-2 sm:gap-3">
            <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center flex-shrink-0">
              <Bot className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
            </div>
            <div className="glass-light rounded-2xl rounded-tl-sm p-2 sm:p-3">
              <div className="flex items-center gap-1">
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-muted-foreground rounded-full animate-typing"></div>
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-muted-foreground rounded-full animate-typing" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-muted-foreground rounded-full animate-typing" style={{ animationDelay: '0.4s' }}></div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="glass-light border-t border-border/50 p-3 sm:p-4">
        <form onSubmit={handleSubmit} className="flex items-center gap-2 sm:gap-3">
          <div className="flex-1 relative">
            <Input
              ref={inputRef}
              type="text"
              placeholder="Descreva sua necessidade de negócio..."
              value={currentMessage}
              onChange={handleInputChange}
              className="glass border-border/50 text-foreground placeholder-muted-foreground focus:border-primary focus:ring-primary/20 rounded-xl text-sm sm:text-base"
              disabled={isLoading}
              data-testid="input-chat-message"
            />
            
            {/* Validation feedback */}
            {liveValidation.error && (
              <div className="absolute -bottom-6 left-0 text-xs text-destructive flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                {liveValidation.error}
              </div>
            )}
          </div>
          
          <Button
            type="submit"
            size="sm"
            disabled={!canSubmit || isLoading}
            className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white border-0 rounded-xl px-3 sm:px-4 py-2 shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed h-10 w-10 sm:h-11 sm:w-11"
            data-testid="button-send-message"
          >
            <Send className="w-4 h-4" />
          </Button>
        </form>
      </div>
    </div>
  );
});

export default ChatInterface;
