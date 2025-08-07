import { useEffect } from "react";
import { MessageCircle } from "lucide-react";
import Header from "@/components/header";
import HeroSection from "@/components/hero-section";
import FeaturesSection from "@/components/features-section";
import ChatInterface from "@/components/chat-interface";
import { useChat } from "@/hooks/use-chat";

export default function Home() {
  const { isChatOpen, unreadCount, openChat, toggleChat, closeChat } = useChat();

  // Add notification after delay
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isChatOpen) {
        // This would normally update unread count, but it's managed in useChat hook
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [isChatOpen]);

  // Add scroll animation observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate");
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "50px",
      }
    );

    const elements = document.querySelectorAll(".animate-fade-in-up");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen">
      <Header onOpenChat={openChat} />
      <HeroSection onOpenChat={openChat} />
      <div className="container mx-auto px-6 max-w-6xl">
        <FeaturesSection />
      </div>

      {/* Footer */}
      <footer className="relative z-10 py-12 mt-24 border-t border-slate-700/50 backdrop-blur-sm">
        <div className="container mx-auto px-6 max-w-6xl text-center">
          <div className="flex flex-col items-center">
            <div className="text-2xl font-bold mb-4 gradient-text">
              NeuroBotX
            </div>
            <p className="text-slate-400 mb-6">
              Soluções com IA para negócios reais. Transformando desafios em oportunidades.
            </p>
            <div className="flex gap-4 mb-6">
              {['facebook-f', 'twitter', 'linkedin-in', 'instagram'].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-primary-500/10 text-primary-400 hover:bg-primary-500 hover:text-white transition-all duration-300 hover:-translate-y-1"
                >
                  <i className={`fab fa-${social}`}></i>
                </a>
              ))}
            </div>
            <div className="text-sm text-slate-500">
              &copy; 2025 NeuroBotX. Todos os direitos reservados.
            </div>
          </div>
        </div>
      </footer>

      {/* Floating Chat Toggle Button */}
      {!isChatOpen && (
        <button
          onClick={toggleChat}
          className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-r from-primary-500 to-violet-500 text-white rounded-full shadow-2xl shadow-primary-500/40 hover:shadow-primary-500/60 hover:scale-110 transition-all duration-300 z-50 flex items-center justify-center focus:outline-none focus:ring-4 focus:ring-primary-500/50"
          aria-label="Abrir chat de suporte"
        >
          <MessageCircle className="w-6 h-6" />
          {unreadCount > 0 && (
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold animate-pulse">
              {unreadCount}
            </div>
          )}
        </button>
      )}

      {/* Chat Interface */}
      <ChatInterface isOpen={isChatOpen} onClose={closeChat} />
    </div>
  );
}
