import { Check, Bot } from "lucide-react";

interface HeroSectionProps {
  onOpenChat: () => void;
}

export default function HeroSection({ onOpenChat }: HeroSectionProps) {
  return (
    <main className="relative z-10 py-16">
      <div className="container mx-auto px-6 max-w-6xl">
        <section className="grid lg:grid-cols-2 gap-12 items-center mb-24 animate-fade-in-up">
          <div className="lg:order-1">
            <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-slate-50 to-slate-300 bg-clip-text text-transparent">
              Automação Inteligente para Seu Negócio
            </h2>
            <p className="text-lg text-slate-400 mb-8 leading-relaxed">
              Nossa IA avançada analisa seu negócio em tempo real e fornece insights personalizados para otimizar processos, aumentar vendas e melhorar a experiência do cliente através de automações inteligentes.
            </p>
            <div className="flex flex-wrap gap-4 mb-8">
              <div className="flex items-center gap-2 text-emerald-400">
                <Check className="w-5 h-5" />
                <span>Análise em Tempo Real</span>
              </div>
              <div className="flex items-center gap-2 text-emerald-400">
                <Check className="w-5 h-5" />
                <span>Relatórios Automatizados</span>
              </div>
              <div className="flex items-center gap-2 text-emerald-400">
                <Check className="w-5 h-5" />
                <span>Integração Simples</span>
              </div>
            </div>
            <button 
              onClick={onOpenChat}
              className="inline-flex items-center gap-3 px-6 py-3 bg-slate-800/50 border border-primary-500/30 text-slate-200 rounded-xl font-medium hover:bg-slate-700/50 hover:border-primary-500/50 transition-all duration-300"
            >
              <i className="fas fa-rocket"></i>
              <span>Comece Agora</span>
            </button>
          </div>
          
          <div className="lg:order-2">
            <div className="glass rounded-3xl p-8 shadow-2xl hover:shadow-primary-500/20 transition-all duration-500 hover:scale-105">
              <div className="text-center">
                <Bot className="w-16 h-16 mx-auto mb-6 text-transparent bg-gradient-to-r from-primary-500 to-violet-500 bg-clip-text" />
                <h3 className="text-2xl font-bold mb-4">IA Conversacional</h3>
                <p className="text-slate-400 leading-relaxed">
                  Interface intuitiva que compreende linguagem natural e fornece respostas contextualmente relevantes para suas necessidades de negócio.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
