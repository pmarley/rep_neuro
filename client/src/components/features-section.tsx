import { TrendingUp, Settings, Users, Shield, Rocket, Brain } from "lucide-react";

const features = [
  {
    icon: TrendingUp,
    title: "Análise de Performance",
    description: "Monitore KPIs em tempo real e receba insights acionáveis para otimizar o desempenho do seu negócio.",
    color: "primary",
  },
  {
    icon: Settings,
    title: "Automação de Processos",
    description: "Automatize tarefas repetitivas e libere sua equipe para focar em atividades estratégicas de alto valor.",
    color: "violet",
  },
  {
    icon: Users,
    title: "Experiência do Cliente",
    description: "Melhore a satisfação do cliente com respostas rápidas e personalizadas 24/7.",
    color: "cyan",
  },
  {
    icon: Shield,
    title: "Segurança Avançada",
    description: "Proteção de dados enterprise com criptografia ponta-a-ponta e compliance total.",
    color: "emerald",
  },
  {
    icon: Rocket,
    title: "Escalabilidade",
    description: "Cresça sem limites com nossa infraestrutura cloud nativa que escala automaticamente.",
    color: "amber",
  },
  {
    icon: Brain,
    title: "IA Adaptativa",
    description: "Sistema que aprende continuamente com suas interações para resultados cada vez melhores.",
    color: "purple",
  },
];

const colorClasses = {
  primary: {
    icon: "text-primary-400",
    title: "text-primary-400",
    bg: "bg-gradient-to-r from-primary-500/20 to-violet-500/20",
    hover: "hover:shadow-primary-500/10",
  },
  violet: {
    icon: "text-violet-400",
    title: "text-violet-400",
    bg: "bg-gradient-to-r from-violet-500/20 to-pink-500/20",
    hover: "hover:shadow-violet-500/10",
  },
  cyan: {
    icon: "text-cyan-400",
    title: "text-cyan-400",
    bg: "bg-gradient-to-r from-cyan-500/20 to-blue-500/20",
    hover: "hover:shadow-cyan-500/10",
  },
  emerald: {
    icon: "text-emerald-400",
    title: "text-emerald-400",
    bg: "bg-gradient-to-r from-emerald-500/20 to-green-500/20",
    hover: "hover:shadow-emerald-500/10",
  },
  amber: {
    icon: "text-amber-400",
    title: "text-amber-400",
    bg: "bg-gradient-to-r from-amber-500/20 to-orange-500/20",
    hover: "hover:shadow-amber-500/10",
  },
  purple: {
    icon: "text-purple-400",
    title: "text-purple-400",
    bg: "bg-gradient-to-r from-purple-500/20 to-indigo-500/20",
    hover: "hover:shadow-purple-500/10",
  },
};

export default function FeaturesSection() {
  return (
    <section className="animate-fade-in-up">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold mb-6 gradient-text">
          Recursos Avançados
        </h2>
        <p className="text-xl text-slate-400 max-w-3xl mx-auto">
          Descubra como nossa plataforma pode transformar a eficiência operacional do seu negócio
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, index) => {
          const colors = colorClasses[feature.color as keyof typeof colorClasses];
          const Icon = feature.icon;
          
          return (
            <div 
              key={index}
              className={`glass rounded-2xl p-8 hover:shadow-2xl ${colors.hover} transition-all duration-500 hover:scale-105 group`}
            >
              <div className={`w-16 h-16 ${colors.bg} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <Icon className={`w-6 h-6 ${colors.icon}`} />
              </div>
              <h3 className={`text-xl font-bold mb-4 ${colors.title}`}>
                {feature.title}
              </h3>
              <p className="text-slate-400 leading-relaxed">
                {feature.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
