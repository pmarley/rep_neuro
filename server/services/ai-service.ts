import type { IAIService } from "./interfaces";
import type { ChatMessage } from "@shared/schema";
import { logger } from "./logger";

// Implementação do serviço de IA seguindo Single Responsibility Principle
export class AIService implements IAIService {
  private readonly webhookUrl = "https://truemetrics-n8n-n8n.b5glig.easypanel.host/webhook/neuro-bot-x";
  
  // Fallback responses em caso de falha no webhook
  private readonly fallbackResponses = [
    "Entendo sua necessidade. Vamos analisar os dados do seu negócio para identificar oportunidades de automação.",
    "Interessante! Com base no que você compartilhou, posso sugerir algumas estratégias para otimizar seus processos.",
    "Perfeito! Vou preparar um diagnóstico personalizado para sua situação. Pode me contar mais sobre seus principais desafios?",
    "Excelente pergunta! Nossa IA pode ajudar a automatizar esse processo e aumentar sua eficiência em até 80%.",
    "Baseado na sua descrição, identifiquei 3 oportunidades principais de melhoria. Gostaria que eu detalhe cada uma?",
    "Essa é uma situação comum que vemos em muitos negócios. Nossa solução de automação pode resolver isso de forma eficiente.",
    "Entendo perfeitamente. Deixe-me analisar seu caso e sugerir as melhores práticas de automação para sua situação.",
  ];

  async generateResponse(userMessage: string, context?: ChatMessage[]): Promise<string> {
    try {
      logger.debug("Generating AI response via webhook", {
        messageLength: userMessage.length,
        hasContext: !!context?.length,
        webhookUrl: this.webhookUrl
      });

      // Tentar usar o webhook primeiro
      const webhookResponse = await this.callWebhook(userMessage, context);
      if (webhookResponse) {
        logger.info("Generated response from webhook");
        return webhookResponse;
      }

      // Fallback para resposta local se webhook falhar
      logger.warn("Webhook failed, using fallback response");
      return await this.getFallbackResponse(userMessage, context);
      
    } catch (error) {
      logger.error("Error generating AI response", error as Error, {
        userMessage: userMessage.substring(0, 50)
      });
      return "Desculpe, ocorreu um erro ao processar sua mensagem. Pode tentar reformular sua pergunta?";
    }
  }

  async getPersonalizedResponse(message: string, userHistory: ChatMessage[]): Promise<string> {
    // Analisa histórico para personalizar resposta
    const recentMessages = userHistory.slice(-5); // Últimas 5 mensagens
    const topics = this.extractTopics(recentMessages);
    
    logger.debug("Generating personalized response", {
      historyLength: userHistory.length,
      recentTopics: topics
    });

    // Se já falou sobre vendas anteriormente
    if (topics.includes('vendas') && message.toLowerCase().includes('resultado')) {
      return "Com base em nossa conversa anterior sobre vendas, vejo que você quer resultados concretos. Vamos implementar um sistema de automação que pode aumentar suas vendas em 40-60% nos próximos 3 meses. Que métricas você gostaria de acompanhar?";
    }

    // Se já falou sobre processos
    if (topics.includes('processo') && message.toLowerCase().includes('implementar')) {
      return "Perfeito! Já mapeamos seus processos na nossa conversa anterior. Agora vamos para a implementação. Sugiro começarmos pela automação do processo mais crítico. Qual é sua prioridade imediata?";
    }

    // Resposta padrão personalizada
    return await this.generateResponse(message);
  }

  validateMessageContent(message: string): boolean {
    const normalizedMessage = message.toLowerCase().trim();
    
    // Verifica se a mensagem é muito simples (só "oi", "ok", etc.)
    const tooSimple = /^(oi|olá|ok|sim|não|obrigado|tchau)$/i.test(normalizedMessage);
    
    // Verifica se tem conteúdo mínimo
    const hasMinimumContent = normalizedMessage.length >= 3;
    
    return hasMinimumContent && !tooSimple;
  }

  private async callWebhook(message: string, context?: ChatMessage[]): Promise<string | null> {
    try {
      const requestBody = {
        message,
        context: context?.slice(-5), // Últimas 5 mensagens para contexto
        timestamp: new Date().toISOString(),
        sessionInfo: {
          hasHistory: !!context?.length,
          messageCount: context?.length || 0
        }
      };

      logger.debug("Calling webhook", {
        url: this.webhookUrl,
        messageLength: message.length,
        contextLength: context?.length || 0
      });

      const response = await fetch(this.webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'User-Agent': 'NeuroBotX/1.0'
        },
        body: JSON.stringify(requestBody),
        // Timeout de 30 segundos para evitar travamento
        signal: AbortSignal.timeout(30000)
      });

      if (!response.ok) {
        logger.warn("Webhook returned error status", {
          status: response.status,
          statusText: response.statusText
        });
        return null;
      }

      const data = await response.json();
      
      // Validar resposta do webhook
      if (typeof data === 'string') {
        return data;
      } else if (data && typeof data.message === 'string') {
        return data.message;
      } else if (data && typeof data.response === 'string') {
        return data.response;
      } else if (data && typeof data.reply === 'string') {
        return data.reply;
      }

      logger.warn("Webhook returned unexpected format", { data });
      return null;

    } catch (error) {
      logger.error("Webhook call failed", error as Error, {
        webhookUrl: this.webhookUrl
      });
      return null;
    }
  }

  private async getFallbackResponse(message: string, context?: ChatMessage[]): Promise<string> {
    // Simula processamento de IA com delay realista
    await this.simulateProcessingDelay();

    // Gera resposta baseada em contexto se disponível
    if (context && context.length > 0) {
      return await this.getPersonalizedResponse(message, context);
    }

    // Gera resposta baseada em palavras-chave
    const keywordResponse = this.getKeywordBasedResponse(message);
    if (keywordResponse) {
      return keywordResponse;
    }

    // Resposta genérica
    return this.getRandomResponse();
  }

  private async simulateProcessingDelay(): Promise<void> {
    // Simula tempo de processamento de IA real (1-3 segundos)
    const delay = 1000 + Math.random() * 2000;
    return new Promise(resolve => setTimeout(resolve, delay));
  }

  private getKeywordBasedResponse(message: string): string | null {
    const lowerMessage = message.toLowerCase();
    
    // Mapeamento atualizado de palavras-chave para fallback
    const keywordMap = new Map([
      ['vendas', "Vendas são cruciais! Nossa IA pode automatizar seu funil de vendas e aumentar suas conversões em até 60%. Que tipo de produtos/serviços você vende?"],
      ['vender', "Vendas são cruciais! Nossa IA pode automatizar seu funil de vendas e aumentar suas conversões em até 60%. Que tipo de produtos/serviços você vende?"],
      ['cliente', "O atendimento ao cliente é fundamental! Posso ajudar a implementar chatbots inteligentes que respondem 24/7 e aumentam a satisfação dos clientes."],
      ['atendimento', "O atendimento ao cliente é fundamental! Posso ajudar a implementar chatbots inteligentes que respondem 24/7 e aumentam a satisfação dos clientes."],
      ['processo', "Otimização de processos é nossa especialidade! Nossa IA pode mapear seus fluxos atuais e sugerir automações que economizam tempo e recursos."],
      ['operação', "Otimização de processos é nossa especialidade! Nossa IA pode mapear seus fluxos atuais e sugerir automações que economizam tempo e recursos."],
      ['marketing', "Marketing digital automatizado pode aumentar seu ROI significativamente! Posso sugerir estratégias de automação para campanhas e nutrição de leads."],
      ['financeiro', "Gestão financeira inteligente é crucial para o crescimento. Nossa IA pode automatizar relatórios, fluxo de caixa e análise de rentabilidade."],
      ['estoque', "Controle de estoque automatizado evita perdas e otimiza custos. Posso implementar sistemas preditivos para reabastecimento inteligente."],
      ['produtividade', "Aumento de produtividade é nosso foco principal! Vamos identificar gargalos e implementar soluções que multiplicam sua eficiência operacional."]
    ]);
    
    for (const [keyword, response] of Array.from(keywordMap.entries())) {
      if (lowerMessage.includes(keyword)) {
        return response;
      }
    }
    
    return null;
  }

  private getRandomResponse(): string {
    return this.fallbackResponses[Math.floor(Math.random() * this.fallbackResponses.length)];
  }

  private extractTopics(messages: ChatMessage[]): string[] {
    const topics: string[] = [];
    const keywords = ['vendas', 'processo', 'cliente', 'marketing', 'financeiro', 'estoque'];
    
    messages.forEach(msg => {
      if (!msg.isUser) return; // Apenas mensagens do usuário
      
      keywords.forEach(keyword => {
        if (msg.content.toLowerCase().includes(keyword) && !topics.includes(keyword)) {
          topics.push(keyword);
        }
      });
    });
    
    return topics;
  }
}

// Singleton para uso global
export const aiService = new AIService();