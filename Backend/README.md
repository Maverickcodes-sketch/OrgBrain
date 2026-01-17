# OrgBrain Backend

Spring Boot REST API for managing organizational resources with AI-powered features using Spring AI and vector databases.

## Features

- RESTful API for employee and manager operations
- AI-powered chat assistant with Ollama integration
- Vector store semantic search
- OAuth2 resource server authentication
- JPA/Hibernate with MariaDB

## Tech Stack

- **Java** 25
- **Spring Boot** 3.5.9
- **Spring Security** - OAuth2
- **Spring Data JPA** - Hibernate ORM
- **Spring AI** 1.1.2 - Ollama integration
- **MariaDB** - Database + vector store
- **Maven** - Build tool

## Project Structure

```
demo/src/main/java/com/example/orgbrain/
├── Config/        # Spring configuration
├── Controller/    # REST endpoints
├── DTO/           # Data transfer objects
├── Entity/        # JPA entities
├── Repository/    # Data access
└── Service/       # Business logic
```

## Prerequisites

- Java 25+
- MariaDB 10.5+
- Ollama (port 11434)
- Keycloak/OAuth2 provider (port 8083)

## Getting Started

### 1. Configure Database

Edit `src/main/resources/application.properties`:

```properties
spring.datasource.url=jdbc:mariadb://localhost:3306/mydb
spring.datasource.username=root
spring.datasource.password=admin
spring.ai.ollama.base-url=http://localhost:11434
spring.security.oauth2.resourceserver.jwt.issuer-uri=http://localhost:8083/realms/project-erp
```

### 2. Build & Run

```bash
cd Backend/demo
mvn clean package
mvn spring-boot:run
```

Or use Maven wrapper:
```bash
./mvnw spring-boot:run          # Linux/Mac
mvnw.cmd spring-boot:run        # Windows
```

Server runs on `http://localhost:8081`

## API Endpoints

- `POST /manager/chat?message=<query>` - Chat with AI assistant
  - Header: `Authorization: Bearer <token>`
  - Returns: Plain text response
- `POST /employee/submit`-To submit employee info return employee info in json

## Architecture

### Authentication
- OAuth2 with JWT tokens from Keycloak
- Secured endpoints via Spring Security

### AI Integration
- Ollama provides LLM capabilities
- Spring AI framework integration
- Vector embeddings for semantic search (768-dim)

### Database
- MariaDB for entities and embeddings
- Vector store for similarity search
- COSINE distance metric

## Configuration

### Ollama Models
- Chat: `qwen3:latest`
- Embedding: `embeddinggemma:latest`

### Vector Store
- Dimensions: 768
- Distance type: COSINE
- Auto-initialization enabled

## Troubleshooting

**MariaDB Connection Failed**: Verify MariaDB is running and credentials are correct.

**Ollama Not Responding**: Start Ollama with `ollama serve` and pull models.

**OAuth2 Token Invalid**: Verify Keycloak issuer URI and token validity.

## Related

- [Frontend Documentation](../Frontend/README.md)

