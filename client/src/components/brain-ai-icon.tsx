export function BrainAIIcon({ className = "w-16 h-16" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="brainGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3B82F6" />
          <stop offset="50%" stopColor="#8B5CF6" />
          <stop offset="100%" stopColor="#06B6D4" />
        </linearGradient>
        <linearGradient id="neuralGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F59E0B" />
          <stop offset="100%" stopColor="#EF4444" />
        </linearGradient>
      </defs>
      
      {/* Cérebro principal */}
      <path
        d="M25 45c0-12 8-20 20-20s20 8 20 20c3-5 8-8 14-8 8 0 14 6 14 14 0 4-2 7-4 9 2 3 3 7 3 11 0 10-8 18-18 18-3 0-6-1-8-2-4 6-11 10-19 10-15 0-22-12-22-27z"
        fill="url(#brainGradient)"
        className="drop-shadow-lg"
      />
      
      {/* Estruturas neurais internas */}
      <circle cx="35" cy="40" r="3" fill="url(#neuralGradient)" opacity="0.8" />
      <circle cx="45" cy="48" r="2.5" fill="url(#neuralGradient)" opacity="0.8" />
      <circle cx="55" cy="42" r="2" fill="url(#neuralGradient)" opacity="0.8" />
      <circle cx="65" cy="50" r="2.5" fill="url(#neuralGradient)" opacity="0.8" />
      <circle cx="40" cy="55" r="2" fill="url(#neuralGradient)" opacity="0.8" />
      <circle cx="58" cy="58" r="2" fill="url(#neuralGradient)" opacity="0.8" />
      
      {/* Conexões neurais */}
      <path
        d="M35 40 L45 48 M45 48 L55 42 M55 42 L65 50 M40 55 L58 58 M45 48 L58 58"
        stroke="url(#neuralGradient)"
        strokeWidth="1.5"
        opacity="0.6"
        className="animate-pulse"
      />
      
      {/* Aura de energia IA */}
      <circle
        cx="50"
        cy="50"
        r="35"
        fill="none"
        stroke="url(#brainGradient)"
        strokeWidth="1"
        opacity="0.3"
        className="animate-pulse"
        style={{ animationDelay: '0.5s' }}
      />
      
      <circle
        cx="50"
        cy="50"
        r="40"
        fill="none"
        stroke="url(#brainGradient)"
        strokeWidth="0.5"
        opacity="0.2"
        className="animate-pulse"
        style={{ animationDelay: '1s' }}
      />
      
      {/* Pontos de luz representando dados */}
      <circle cx="20" cy="30" r="1" fill="#3B82F6" className="animate-ping" style={{ animationDelay: '0.2s' }} />
      <circle cx="80" cy="35" r="1" fill="#8B5CF6" className="animate-ping" style={{ animationDelay: '0.8s' }} />
      <circle cx="25" cy="70" r="1" fill="#06B6D4" className="animate-ping" style={{ animationDelay: '1.2s' }} />
      <circle cx="75" cy="70" r="1" fill="#F59E0B" className="animate-ping" style={{ animationDelay: '0.6s' }} />
    </svg>
  );
}