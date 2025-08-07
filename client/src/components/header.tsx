import { Brain } from "lucide-react";

interface HeaderProps {
  onOpenChat: () => void;
}

export default function Header({ onOpenChat }: HeaderProps) {
  return (
    <header className="relative z-10 pt-20 pb-12 text-center animate-fade-in-up">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="flex justify-center mb-6">
          <div className="glass w-20 h-20 rounded-full flex items-center justify-center shadow-2xl shadow-primary-500/20 hover:shadow-primary-500/40 transition-all duration-300 hover:scale-110">
            <Brain className="w-8 h-8 text-transparent bg-gradient-to-r from-primary-500 to-violet-500 bg-clip-text" />
          </div>
        </div>
        
        <h1 className="text-5xl md:text-6xl font-bold mb-6 gradient-text leading-tight">
          NeuroBotX
        </h1>
        
        <p className="text-xl text-slate-300 max-w-3xl mx-auto mb-8 leading-relaxed">
          Receba diagnósticos automatizados via chat IA e descubra como escalar seu negócio com automações inteligentes de última geração.
        </p>
        
        <button 
          onClick={onOpenChat}
          className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-primary-500 to-violet-500 text-white rounded-2xl font-semibold text-lg shadow-lg shadow-primary-500/25 hover:shadow-primary-500/40 hover:scale-105 transform transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-primary-500/50"
          aria-label="Iniciar diagnóstico com IA"
        >
          <i className="fas fa-comments"></i>
          <span>Iniciar Diagnóstico IA</span>
          <i className="fas fa-arrow-right group-hover:translate-x-1 transition-transform duration-300"></i>
        </button>
      </div>
    </header>
  );
}
