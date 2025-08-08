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
          <div className="px-4 animate-slide-up">
            <h1 className="text-4xl sm:text-6xl font-bold mb-6 gradient-text leading-tight">
              Transforme seu Negócio
              <br />
              com IA Inteligente
            </h1>
          </div>

          {/* Descrição */}
          <div className="animate-fade-in-delayed">
            <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
              Nosso <strong className="text-primary">chatbot inteligente</strong> identifica suas necessidades específicas, 
              realiza diagnósticos precisos do seu negócio e recomenda 
              <strong className="text-accent"> soluções de IA personalizadas</strong>. 
              Após a análise, conectamos você com nossa equipe especializada para implementação completa.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                🔍 Diagnóstico Automático
              </span>
              <span className="px-3 py-1 bg-accent/10 text-accent rounded-full text-sm font-medium">
                🎯 Soluções Personalizadas
              </span>
              <span className="px-3 py-1 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-full text-sm font-medium">
                🚀 Implementação Profissional
              </span>
            </div>
          </div>

          {/* Botão Principal */}
          <div className="flex flex-col items-center gap-4 animate-slide-up-delayed">
            <button
              onClick={openChat}
              className="group inline-flex items-center gap-3 px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-primary to-accent rounded-full hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl animate-pulse-button"
              data-testid="button-start-chat"
            >
              <MessageCircle className="w-6 h-6 group-hover:animate-bounce" />
              Começar Diagnóstico Gratuito
            </button>
            <p className="text-sm text-muted-foreground">
              ✨ Sem cadastro • ⚡ Diagnóstico em 2 minutos • 🎯 Soluções personalizadas
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

          {/* Processo e Como Funciona */}
          <div className="mt-20 mb-16 max-w-5xl mx-auto animate-slide-up-delayed">
            <h2 className="text-3xl font-bold text-center mb-12 gradient-text">
              Como Funciona Nosso Sistema
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              <div className="text-center p-6 glass rounded-2xl hover:scale-105 transition-all duration-300 animate-fade-in-stagger">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center">
                  <span className="text-2xl">💬</span>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-foreground">1. Conversa Inteligente</h3>
                <p className="text-muted-foreground text-sm">
                  Descreva suas necessidades e desafios. Nossa IA fará perguntas específicas para entender seu negócio.
                </p>
              </div>
              <div className="text-center p-6 glass rounded-2xl hover:scale-105 transition-all duration-300 animate-fade-in-stagger" style={{animationDelay: '0.2s'}}>
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-accent to-primary rounded-full flex items-center justify-center">
                  <span className="text-2xl">🔍</span>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-foreground">2. Diagnóstico Preciso</h3>
                <p className="text-muted-foreground text-sm">
                  Análise completa dos seus processos, identificação de gargalos e oportunidades de melhoria.
                </p>
              </div>
              <div className="text-center p-6 glass rounded-2xl hover:scale-105 transition-all duration-300 animate-fade-in-stagger" style={{animationDelay: '0.4s'}}>
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center">
                  <span className="text-2xl">🚀</span>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-foreground">3. Implementação</h3>
                <p className="text-muted-foreground text-sm">
                  Nossa equipe especializada implementa as soluções recomendadas com acompanhamento completo.
                </p>
              </div>
            </div>
          </div>

          {/* Casos de Uso */}
          <div className="mt-20 mb-20 max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-center mb-12 gradient-text">
              Ideal para Qualquer Tipo de Negócio
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              {[
                { icon: "🏪", title: "E-commerce", desc: "Otimize conversões e vendas", solutions: "Chatbots, Automação de vendas" },
                { icon: "🏥", title: "Serviços", desc: "Automatize agendamentos", solutions: "Assistentes virtuais, CRM inteligente" },
                { icon: "🏭", title: "Indústria", desc: "Reduza desperdícios", solutions: "IoT, Análise preditiva" },
                { icon: "📱", title: "SaaS", desc: "Melhore retenção", solutions: "Support bots, Analytics IA" }
              ].map((item, i) => (
                <div key={i} className="text-center p-6 glass rounded-xl hover:scale-105 transition-all duration-300 animate-fade-in-stagger group" style={{animationDelay: `${i * 0.1}s`}}>
                  <div className="text-3xl mb-3 group-hover:animate-bounce">{item.icon}</div>
                  <div className="font-semibold text-foreground mb-2">{item.title}</div>
                  <div className="text-xs text-muted-foreground mb-2">{item.desc}</div>
                  <div className="text-xs text-accent font-medium">{item.solutions}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Footer com melhor espaçamento */}
      <footer className="relative z-10 py-16 mt-20 border-t border-border/20">
        <div className="container mx-auto max-w-6xl px-6">
          <div className="text-center space-y-6">
            <div className="text-2xl font-bold gradient-text mb-4">
              NeuroBotX
            </div>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Potencializando negócios com Inteligência Artificial. 
              Diagnósticos precisos, soluções personalizadas e implementação profissional.
            </p>
            <div className="flex justify-center gap-8 text-sm flex-wrap">
              <span className="text-primary">✨ Diagnóstico Gratuito</span>
              <span className="text-accent">🚀 Implementação Rápida</span>
              <span className="text-emerald-600 dark:text-emerald-400">🎯 Resultados Garantidos</span>
            </div>
            <div className="pt-6 border-t border-border/10">
              <p className="text-xs text-muted-foreground">
                © 2024 NeuroBotX. Transformando o futuro dos negócios com IA.
              </p>
            </div>
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
