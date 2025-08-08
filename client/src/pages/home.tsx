import { MessageCircle } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { BrainAIIcon } from "@/components/brain-ai-icon";
import ChatInterface from "@/components/chat-interface";
import { useChat } from "@/hooks/use-chat";

export default function Home() {
  const { isChatOpen, unreadCount, openChat, toggleChat, closeChat } = useChat();

  return (
    <div className="min-h-screen relative">
      {/* Header simplificado */}
      <header className="relative z-10 p-6">
        <div className="container mx-auto max-w-6xl flex justify-between items-center">
          <div className="text-2xl font-bold gradient-text">
            NeuroBotX
          </div>
          <ThemeToggle />
        </div>
      </header>

      {/* Seção Hero Principal */}
      <main className="relative z-10 flex flex-col items-center justify-center min-h-[80vh] px-6">
        <div className="text-center max-w-4xl mx-auto">
          {/* Ícone do Cérebro IA */}
          <div className="mb-8 flex justify-center">
            <div className="p-4 rounded-3xl glass">
              <BrainAIIcon className="w-32 h-32 sm:w-40 sm:h-40" />
            </div>
          </div>

          {/* Título Principal */}
          <h1 className="text-4xl sm:text-6xl font-bold mb-6 gradient-text">
            Transforme seu Negócio
            <br />
            com IA Inteligente
          </h1>

          {/* Descrição */}
          <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Nosso assistente IA analisa seu negócio em tempo real e oferece 
            <strong className="text-primary"> soluções personalizadas</strong> para 
            aumentar vendas, reduzir custos e automatizar processos. 
            <span className="block mt-2 text-accent font-medium">
              Resultados comprovados em menos de 30 dias.
            </span>
          </p>

          {/* Botão Principal */}
          <div className="flex flex-col items-center gap-4">
            <button
              onClick={openChat}
              className="inline-flex items-center gap-3 px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-primary to-accent rounded-full hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
              data-testid="button-start-chat"
            >
              <MessageCircle className="w-6 h-6" />
              Análise Gratuita Agora
            </button>
            <p className="text-sm text-muted-foreground">
              💡 Sem cadastro • ⚡ Resultados em 2 minutos • 🎯 100% personalizado
            </p>
          </div>

          {/* Resultados e Benefícios */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-16 max-w-3xl mx-auto">
            <div className="text-center p-6 glass rounded-2xl">
              <div className="text-3xl font-bold gradient-text mb-2">+127%</div>
              <div className="text-sm text-muted-foreground font-medium">Aumento Médio em Vendas</div>
              <div className="text-xs text-accent mt-1">Em 30-60 dias</div>
            </div>
            <div className="text-center p-6 glass rounded-2xl">
              <div className="text-3xl font-bold gradient-text mb-2">-43%</div>
              <div className="text-sm text-muted-foreground font-medium">Redução de Custos</div>
              <div className="text-xs text-accent mt-1">Automação inteligente</div>
            </div>
            <div className="text-center p-6 glass rounded-2xl">
              <div className="text-3xl font-bold gradient-text mb-2">24h</div>
              <div className="text-sm text-muted-foreground font-medium">Tempo de Implementação</div>
              <div className="text-xs text-accent mt-1">Plug & play</div>
            </div>
          </div>

          {/* Casos de Uso */}
          <div className="mt-16 max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-center mb-8 gradient-text">
              Ideal para Seu Tipo de Negócio
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { icon: "🏪", title: "E-commerce", desc: "Otimize conversões" },
                { icon: "🏥", title: "Serviços", desc: "Automatize agendamentos" },
                { icon: "🏭", title: "Indústria", desc: "Reduza desperdícios" },
                { icon: "📱", title: "SaaS", desc: "Melhore retenção" }
              ].map((item, i) => (
                <div key={i} className="text-center p-4 glass rounded-xl hover:scale-105 transition-transform">
                  <div className="text-2xl mb-2">{item.icon}</div>
                  <div className="font-semibold text-sm text-foreground">{item.title}</div>
                  <div className="text-xs text-muted-foreground mt-1">{item.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Footer Simplificado */}
      <footer className="relative z-10 py-8 mt-auto border-t border-border/50">
        <div className="container mx-auto px-6 max-w-6xl text-center">
          <div className="text-sm text-muted-foreground">
            &copy; 2025 NeuroBotX. Transformando negócios com Inteligência Artificial.
          </div>
        </div>
      </footer>

      {/* Botão Flutuante do Chat */}
      {!isChatOpen && (
        <button
          onClick={toggleChat}
          className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-r from-primary to-accent text-white rounded-full shadow-2xl hover:shadow-xl hover:scale-110 transition-all duration-300 z-50 flex items-center justify-center focus:outline-none focus:ring-4 focus:ring-primary/50"
          aria-label="Abrir chat"
          data-testid="button-toggle-chat"
        >
          <MessageCircle className="w-6 h-6" />
          {unreadCount > 0 && (
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold animate-pulse">
              {unreadCount}
            </div>
          )}
        </button>
      )}

      {/* Interface do Chat */}
      <ChatInterface isOpen={isChatOpen} onClose={closeChat} />
    </div>
  );
}
