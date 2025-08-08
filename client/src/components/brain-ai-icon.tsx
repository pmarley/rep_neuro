export function BrainAIIcon({ className = "w-16 h-16" }: { className?: string }) {
  return (
    <div className="relative">
      <svg
        className={`${className} animate-bounce-slow`}
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{animationDuration: '3s'}}
      >
        <defs>
          <linearGradient id="robotMainGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3B82F6" />
            <stop offset="50%" stopColor="#8B5CF6" />
            <stop offset="100%" stopColor="#06B6D4" />
          </linearGradient>
          <linearGradient id="robotEyeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#06B6D4" />
            <stop offset="100%" stopColor="#0EA5E9" />
          </linearGradient>
          <linearGradient id="robotAntennaGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F59E0B" />
            <stop offset="100%" stopColor="#F97316" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        {/* Aura de fundo */}
        <circle cx="60" cy="60" r="55" fill="none" stroke="url(#robotMainGradient)" strokeWidth="1" opacity="0.2" className="animate-pulse" style={{animationDuration: '2s'}} />
        <circle cx="60" cy="60" r="50" fill="none" stroke="url(#robotMainGradient)" strokeWidth="0.5" opacity="0.3" className="animate-pulse" style={{animationDuration: '2.5s', animationDelay: '0.5s'}} />
        
        {/* Cabeça do Robô */}
        <rect
          x="35"
          y="40"
          width="50"
          height="50"
          rx="15"
          fill="url(#robotMainGradient)"
          className="drop-shadow-2xl"
          filter="url(#glow)"
        />
        
        {/* Antenas com animação */}
        <g strokeWidth="3" strokeLinecap="round">
          <line x1="50" y1="40" x2="50" y2="25" stroke="url(#robotAntennaGradient)" className="animate-pulse" />
          <line x1="70" y1="40" x2="70" y2="20" stroke="url(#robotAntennaGradient)" className="animate-pulse" style={{animationDelay: '0.3s'}} />
          <circle cx="50" cy="22" r="3" fill="url(#robotAntennaGradient)" className="animate-ping" style={{animationDuration: '2s'}} />
          <circle cx="70" cy="17" r="3" fill="url(#robotAntennaGradient)" className="animate-ping" style={{animationDuration: '2s', animationDelay: '0.7s'}} />
        </g>
        
        {/* Olhos com brilho */}
        <g>
          <circle cx="50" cy="55" r="8" fill="url(#robotEyeGradient)" className="animate-pulse" filter="url(#glow)" />
          <circle cx="70" cy="55" r="8" fill="url(#robotEyeGradient)" className="animate-pulse" style={{animationDelay: '0.4s'}} filter="url(#glow)" />
          <circle cx="50" cy="55" r="4" fill="white" />
          <circle cx="70" cy="55" r="4" fill="white" />
          <circle cx="51" cy="54" r="2" fill="#1f2937" className="animate-bounce" style={{animationDuration: '3s'}} />
          <circle cx="71" cy="54" r="2" fill="#1f2937" className="animate-bounce" style={{animationDuration: '3s', animationDelay: '0.2s'}} />
        </g>
        
        {/* Boca/Alto-falante com LEDs */}
        <rect x="52" y="70" width="16" height="6" rx="3" fill="currentColor" opacity="0.7" />
        <rect x="54" y="72" width="3" height="2" rx="1" fill="url(#robotEyeGradient)" className="animate-pulse" />
        <rect x="58" y="72" width="3" height="2" rx="1" fill="url(#robotEyeGradient)" className="animate-pulse" style={{animationDelay: '0.2s'}} />
        <rect x="62" y="72" width="3" height="2" rx="1" fill="url(#robotEyeGradient)" className="animate-pulse" style={{animationDelay: '0.4s'}} />
        
        {/* Corpo compacto */}
        <rect x="42" y="90" width="36" height="25" rx="8" fill="url(#robotMainGradient)" opacity="0.9" />
        
        {/* Painel do peito com indicadores */}
        <rect x="50" y="97" width="20" height="11" rx="4" fill="currentColor" opacity="0.3" />
        <circle cx="56" cy="102" r="2" fill="url(#robotEyeGradient)" className="animate-pulse" style={{animationDelay: '1s'}} />
        <circle cx="64" cy="102" r="2" fill="url(#robotAntennaGradient)" className="animate-pulse" style={{animationDelay: '1.3s'}} />
        
        {/* Pescoço de conexão */}
        <rect x="57" y="90" width="6" height="8" fill="url(#robotMainGradient)" />
        
        {/* Partículas flutuantes de dados */}
        <circle cx="25" cy="35" r="1.5" fill="#3B82F6" className="animate-ping" style={{animationDelay: '0.1s'}} />
        <circle cx="95" cy="40" r="1.5" fill="#8B5CF6" className="animate-ping" style={{animationDelay: '0.8s'}} />
        <circle cx="30" cy="85" r="1.5" fill="#06B6D4" className="animate-ping" style={{animationDelay: '1.2s'}} />
        <circle cx="90" cy="80" r="1.5" fill="#F59E0B" className="animate-ping" style={{animationDelay: '0.4s'}} />
      </svg>
    </div>
  );
}