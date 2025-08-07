import type { ILogger } from "./interfaces";

// Implementação do Logger seguindo Single Responsibility Principle
export class Logger implements ILogger {
  private formatMessage(level: string, message: string, meta?: Record<string, any>): string {
    const timestamp = new Date().toISOString();
    const baseLog = `[${timestamp}] ${level.toUpperCase()}: ${message}`;
    
    if (meta && Object.keys(meta).length > 0) {
      return `${baseLog} | Meta: ${JSON.stringify(meta)}`;
    }
    
    return baseLog;
  }

  info(message: string, meta?: Record<string, any>): void {
    console.log(this.formatMessage('info', message, meta));
  }

  error(message: string, error?: Error, meta?: Record<string, any>): void {
    const errorMeta = {
      ...meta,
      ...(error && {
        errorName: error.name,
        errorMessage: error.message,
        stack: error.stack
      })
    };
    
    console.error(this.formatMessage('error', message, errorMeta));
  }

  warn(message: string, meta?: Record<string, any>): void {
    console.warn(this.formatMessage('warn', message, meta));
  }

  debug(message: string, meta?: Record<string, any>): void {
    if (process.env.NODE_ENV === 'development') {
      console.debug(this.formatMessage('debug', message, meta));
    }
  }
}

// Singleton para uso global
export const logger = new Logger();