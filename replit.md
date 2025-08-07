# Overview

NeuroBotX is a full-stack web application that provides AI-powered business diagnostics through a conversational chat interface. The application allows users to interact with an AI assistant that analyzes their business needs and provides automated recommendations for process optimization, sales enhancement, and customer service improvements. Built with a modern React frontend and Express backend, the system features a sleek dark-themed UI with glass morphism design elements and real-time chat functionality.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React 18 with TypeScript, using Vite as the build tool
- **UI Library**: shadcn/ui components built on Radix UI primitives for accessibility and consistency
- **Styling**: Tailwind CSS with custom design system featuring dark theme and glass morphism effects
- **State Management**: TanStack React Query for server state and custom hooks for local state
- **Routing**: Wouter for lightweight client-side routing
- **Form Handling**: React Hook Form with Zod validation for type-safe form management

The frontend follows a component-based architecture with clear separation between UI components, business logic hooks, and utility functions. The design system emphasizes a modern dark theme with gradient backgrounds and glass effects.

## Backend Architecture
- **Framework**: Express.js with TypeScript for type safety
- **API Design**: RESTful API with structured error handling and request logging middleware
- **Rate Limiting**: Express rate limiting to prevent abuse of chat endpoints
- **Input Validation**: Zod schemas for request validation and sanitization
- **Session Management**: Session token-based approach for maintaining chat conversations

The backend uses a modular architecture with separate concerns for routing, storage abstraction, and business logic. Mock AI responses are currently implemented with keyword-based selection for demonstration purposes.

## Data Storage Solutions
- **Database**: PostgreSQL with Drizzle ORM for type-safe database operations
- **Schema Management**: Drizzle Kit for migrations and schema management
- **Development Storage**: In-memory storage implementation for development/testing
- **Production Storage**: Neon Database serverless PostgreSQL for production deployment

The data layer uses an interface-based approach allowing for easy swapping between storage implementations. The schema includes users, chat sessions, and chat messages with proper relationships and constraints.

## Authentication and Authorization
- **Session-based**: Uses session tokens for maintaining user conversations
- **Storage**: Session data stored in database with session tokens for identification
- **Security**: Basic input sanitization and rate limiting implemented
- **User Management**: Simple user creation and lookup system in place

## External Dependencies
- **Database**: Neon Database (PostgreSQL) for production data persistence
- **UI Components**: Radix UI for accessible component primitives
- **Icons**: Lucide React for consistent iconography and Font Awesome for additional icons
- **Validation**: Zod for runtime type validation and schema definition
- **HTTP Client**: Fetch API with custom wrapper for API requests
- **Development Tools**: Replit integration for development environment support

The application is designed to be easily deployable on Replit with built-in development tools and environment configuration. The modular architecture allows for easy extension of AI capabilities and integration with external AI services.