export function BrainAIIcon({ className = "w-16 h-16" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="robotGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3B82F6" />
          <stop offset="50%" stopColor="#8B5CF6" />
          <stop offset="100%" stopColor="#06B6D4" />
        </linearGradient>
        <linearGradient id="eyeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#06B6D4" />
          <stop offset="100%" stopColor="#0EA5E9" />
        </linearGradient>
        <linearGradient id="antennaGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F59E0B" />
          <stop offset="100%" stopColor="#F97316" />
        </linearGradient>
      </defs>
      
      {/* Cabeça do Robô */}
      <rect
        x="30"
        y="35"
        width="40"
        height="40"
        rx="12"
        fill="url(#robotGradient)"
        className="drop-shadow-lg"
      />
      
      {/* Antenas */}
      <g strokeWidth="2" strokeLinecap="round">
        <line x1="42" y1="35" x2="42" y2="25" stroke="url(#antennaGradient)" />
        <line x1="58" y1="35" x2="58" y2="22" stroke="url(#antennaGradient)" />
        <circle cx="42" cy="22" r="2.5" fill="url(#antennaGradient)" className="animate-pulse" />
        <circle cx="58" cy="19" r="2.5" fill="url(#antennaGradient)" className="animate-pulse" style={{animationDelay: '0.5s'}} />
      </g>
      
      {/* Olhos */}
      <g>
        <circle cx="42" cy="47" r="6" fill="url(#eyeGradient)" className="animate-pulse" />
        <circle cx="58" cy="47" r="6" fill="url(#eyeGradient)" className="animate-pulse" style={{animationDelay: '0.3s'}} />
        <circle cx="42" cy="47" r="3" fill="white" />
        <circle cx="58" cy="47" r="3" fill="white" />
        <circle cx="43" cy="46" r="1.5" fill="#1f2937" />
        <circle cx="59" cy="46" r="1.5" fill="#1f2937" />
      </g>
      
      {/* Boca/Alto-falante */}
      <rect x="45" y="57" width="10" height="4" rx="2" fill="currentColor" opacity="0.6" />
      <rect x="46" y="58" width="2" height="2" rx="1" fill="url(#eyeGradient)" />
      <rect x="49" y="58" width="2" height="2" rx="1" fill="url(#eyeGradient)" />
      <rect x="52" y="58" width="2" height="2" rx="1" fill="url(#eyeGradient)" />
      
      {/* Corpo */}
      <rect x="35" y="75" width="30" height="20" rx="6" fill="url(#robotGradient)" opacity="0.8" />
      
      {/* Painel do peito */}
      <rect x="42" y="80" width="16" height="10" rx="3" fill="currentColor" opacity="0.2" />
      <circle cx="47" cy="84" r="1.5" fill="url(#eyeGradient)" className="animate-pulse" style={{animationDelay: '1s'}} />
      <circle cx="53" cy="84" r="1.5" fill="url(#antennaGradient)" className="animate-pulse" style={{animationDelay: '1.5s'}} />
      
      {/* Pescoço */}
      <rect x="47" y="75" width="6" height="6" fill="url(#robotGradient)" />
      
      {/* Aura digital */}
      <circle cx="50" cy="50" r="45" fill="none" stroke="url(#robotGradient)" strokeWidth="0.5" opacity="0.3" className="animate-ping" style={{animationDuration: '3s'}} />
      
      {/* Padrão de circuito de fundo */}
      <g stroke="currentColor" strokeWidth="0.5" opacity="0.1">
        <path d="M20 25L25 25L25 30" fill="none" />
        <path d="M75 20L80 20L80 25" fill="none" />
        <path d="M80 75L75 75L75 80" fill="none" />
        <path d="M25 80L20 80L20 75" fill="none" />
        <circle cx="22.5" cy="27.5" r="1" fill="currentColor" />
        <circle cx="77.5" cy="22.5" r="1" fill="currentColor" />
        <circle cx="77.5" cy="77.5" r="1" fill="currentColor" />
        <circle cx="22.5" cy="77.5" r="1" fill="currentColor" />
      </g>
    </svg>
  );
}