// Utilitário para gerenciar identificador único do usuário
export class UserSession {
  private static readonly USER_ID_KEY = 'neurobot-user-id';
  private static readonly SESSION_KEY = 'neurobot-session-token';

  // Gera ou recupera o ID único do usuário
  static getUserId(): string {
    let userId = localStorage.getItem(this.USER_ID_KEY);
    
    if (!userId) {
      // Gera um ID único baseado em timestamp e random
      userId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      localStorage.setItem(this.USER_ID_KEY, userId);
    }
    
    return userId;
  }

  // Gerencia token de sessão
  static getSessionToken(): string | null {
    return localStorage.getItem(this.SESSION_KEY);
  }

  static setSessionToken(token: string): void {
    localStorage.setItem(this.SESSION_KEY, token);
  }

  static clearSession(): void {
    localStorage.removeItem(this.SESSION_KEY);
  }

  // Limpa todos os dados da sessão
  static clearAll(): void {
    localStorage.removeItem(this.USER_ID_KEY);
    localStorage.removeItem(this.SESSION_KEY);
  }

  // Obtém metadados do usuário para enviar no webhook
  static getUserMetadata() {
    return {
      userId: this.getUserId(),
      sessionToken: this.getSessionToken(),
      userAgent: navigator.userAgent,
      platform: navigator.platform,
      language: navigator.language,
      timestamp: new Date().toISOString()
    };
  }
}