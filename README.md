# OrgBrain

An intelligent organizational management system with AI-powered hiring assistance, combining a modern React frontend with a Spring Boot backend powered by artificial intelligence.

## 🎯 Project Overview

OrgBrain is a full-stack web application designed to help managers and HR professionals efficiently manage their teams, search for employees, and leverage AI-powered insights for better hiring decisions. The platform features real-time chat capabilities with an AI assistant, comprehensive employee management, and OAuth2-secured access.

---

## 🛠️ Tech Stack

### Frontend
[![React](https://img.shields.io/badge/React-18.3.1-61DAFB?logo=react&logoColor=white)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-ESNext-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite-6.3.5-646CFF?logo=vite&logoColor=white)](https://vitejs.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1.12-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Radix UI](https://img.shields.io/badge/Radix_UI-Latest-161616?logo=data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjU2IiBoZWlnaHQ9IjI1NiIgdmlld0JveD0iMCAwIDI1NiAyNTYiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyNTYiIGhlaWdodD0iMjU2IiBmaWxsPSIjMUMxQzFDIi8+CjxwYXRoIGQ9Ik0xMjggNjRMMTkyIEwxOTIgMTkyTDEyOCAxOTJWNjRaIiBmaWxsPSJ3aGl0ZSIvPgo8cGF0aCBkPSJNOTYgMTE2SDY0VjE0NEg5NlYxMTZaIiBmaWxsPSJ3aGl0ZSIvPgo8L3N2Zz4=)](https://www.radix-ui.com)

### Backend
[![Java](https://img.shields.io/badge/Java-25-ED8B00?logo=java&logoColor=white)](https://www.java.com)
[![Spring Boot](https://img.shields.io/badge/Spring_Boot-3.5.9-6DB33F?logo=springboot&logoColor=white)](https://spring.io/projects/spring-boot)
[![Spring Security](https://img.shields.io/badge/Spring_Security-OAuth2-6DB33F?logo=springsecurity&logoColor=white)](https://spring.io/projects/spring-security)
[![Spring AI](https://img.shields.io/badge/Spring_AI-1.1.2-6DB33F?logo=spring&logoColor=white)](https://spring.io/projects/spring-ai)
[![Maven](https://img.shields.io/badge/Maven-Build-C71A36?logo=apachemaven&logoColor=white)](https://maven.apache.org)

### Database & AI
[![MariaDB](https://img.shields.io/badge/MariaDB-10.5+-003545?logo=mariadb&logoColor=white)](https://mariadb.org)
[![Ollama](https://img.shields.io/badge/Ollama-LLM-000000?logo=data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIHZpZXdCb3g9IjAgMCA1MCA1MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSIyNSIgY3k9IjI1IiByPSIyMyIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSIyIi8+PHRleHQgeD0iMjUiIHk9IjMxIiBmb250LXNpemU9IjIwIiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC13ZWlnaHQ9ImJvbGQiPk9MPC90ZXh0Pjwvc3ZnPg==)](https://ollama.ai)

### Authentication
[![Keycloak](https://img.shields.io/badge/Keycloak-OAuth2/OIDC-1D3557?logo=data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIHZpZXdCb3g9IjAgMCA1MCA1MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIGZpbGw9IiMxRDM1NTciIHJ4PSI1Ii8+PHRleHQgeD0iMjUiIHk9IjMxIiBmb250LXNpemU9IjI4IiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC13ZWlnaHQ9ImJvbGQiPks8L3RleHQ+PC9zdmc+)](https://www.keycloak.org)

---

## 📁 Project Structure

```
OrgBrain/
├── Frontend/                 # React + TypeScript + Vite application
│   ├── src/
│   │   ├── app/
│   │   │   ├── components/   # Reusable UI components
│   │   │   ├── contexts/     # React contexts (Auth)
│   │   │   └── pages/        # Page components
│   │   └── styles/           # CSS and Tailwind
│   ├── package.json
│   ├── vite.config.ts
│   ├── tsconfig.json
│   └── README.md
│
├── Backend/                  # Spring Boot REST API
│   ├── demo/
│   │   ├── src/
│   │   │   ├── main/java/com/example/orgbrain/
│   │   │   │   ├── Config/       # Spring configuration
│   │   │   │   ├── Controller/   # REST endpoints
│   │   │   │   ├── DTO/          # Data transfer objects
│   │   │   │   ├── Entity/       # JPA entities
│   │   │   │   ├── Repository/   # Data access layer
│   │   │   │   └── Service/      # Business logic
│   │   │   └── resources/
│   │   │       └── application.properties
│   │   ├── pom.xml
│   │   └── mvnw
│   └── README.md
│
└── README.md (this file)
```

---

## Quick Start

### Prerequisites
- **Node.js** 18+ (Frontend)
- **Java** 25+ (Backend)
- **MariaDB** 10.5+ (Database)
- **Ollama** (AI Models)
- **Keycloak** (Authentication)

### Frontend Setup
```bash
cd Frontend
npm install
npm run dev
```
Access at `http://localhost:5173`

### Backend Setup
```bash
cd Backend/demo
mvn clean package
mvn spring-boot:run
```
Server at `http://localhost:8081`




## ✨ Key Features

- **AI-Powered Assistant** - Chat interface for intelligent hiring queries
- **Manager Dashboard** - Comprehensive organizational management
- **Employee Management** - Search, filter, and manage employee information
- **OAuth2 Authentication** - Secure access with Keycloak
- **Vector Search** - AI-powered semantic search capabilities
- **Responsive Design** - Mobile-friendly dark theme interface

---

## 🔐 Architecture Highlights

```
┌─────────────────────────────────────────────────────────────┐
│                      Frontend (React)                        │
│  Manager Portal | Chat | Employee Management               │
└──────────────────────────┬──────────────────────────────────┘
                           │ REST API
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                   Backend (Spring Boot)                      │
│  Controllers | Services | JPA Repositories                  │
└──────────────────────┬───────────────────────────────────────┘
                       │
        ┌──────────────┼──────────────┐
        ▼              ▼              ▼
    ┌────────┐   ┌─────────┐   ┌──────────┐
    │ MariaDB│   │ Ollama  │   │ Keycloak │
    │        │   │ (LLM)   │   │ (OAuth2) │
    └────────┘   └─────────┘   └──────────┘
```

---

## 🌐 API Endpoints

### Manager
- `POST /manager/chat?message=<query>` - Chat with AI assistant

### Employee
- `GET /employee/submit` - For employees to submit the form

---

## 🛠️ Configuration

### Environment Files
- Frontend: `Frontend/.env`
- Backend: `Backend/demo/src/main/resources/application.properties`

### Required Services
1. **MariaDB** - Database with vector store support
2. **Ollama** - Running on port 11434 with models pulled
3. **Keycloak** - OAuth2 provider on port 8083

---

## 📚 Documentation

- [Frontend Documentation](./Frontend/README.md) - React setup and architecture
- [Backend Documentation](./Backend/README.md) - Spring Boot setup and API details

---

## 🤝 Architecture & Technologies

| Component | Technology | Purpose |
|-----------|-----------|---------|
| Frontend UI | React + TypeScript | User interface |
| Styling | Tailwind CSS + Radix UI | Responsive design |
| Build Tool | Vite | Fast development |
| Backend API | Spring Boot | REST services |
| Database | MariaDB | Data persistence + vector store |
| AI Engine | Ollama + Spring AI | LLM capabilities |
| Authentication | Keycloak + OAuth2 | Secure access |
| ORM | Hibernate + JPA | Database mapping |

---

## 🔄 Development Workflow

1. **Start Services**
   ```bash
   # Terminal 1: Start MariaDB
   # Terminal 2: Start Keycloak
   # Terminal 3: Start Ollama
   ollama serve
   ```

2. **Backend Development**
   ```bash
   cd Backend/demo
   mvn spring-boot:run
   ```

3. **Frontend Development**
   ```bash
   cd Frontend
   npm run dev
   ```

---

## 📊 Performance

- **Frontend**: Vite provides fast HMR and optimized builds
- **Backend**: Spring Boot with connection pooling and JPA caching
- **Database**: Vector store queries optimized with COSINE distance
- **AI**: Ollama integration for local LLM inference

---

## 🔒 Security

- OAuth2 authentication via Keycloak
- JWT token validation
- Spring Security for endpoint protection
- SQL injection prevention via JPA
- CORS configuration for frontend origin

---

