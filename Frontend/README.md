# OrgBrain Frontend

A modern React-based frontend for managing organizational resources and AI-powered hiring assistance.

## Features

- AI-powered chat assistant for hiring queries
- Manager portal dashboard
- Employee management and information retrieval
- OAuth 2.0 authentication(Keycloak)
- Dark theme with responsive design

## Tech Stack

- **React** 18.3.1 + TypeScript
- **Vite** 6.3.5 - Build tool
- **Tailwind CSS** 4.1.12 - Styling
- **Radix UI** - UI components
- **React Router** - Navigation
- **Lucide Icons** - Icon library

## Project Structure

```
src/
├── app/
│   ├── components/       # Reusable UI components
│   ├── contexts/         # AuthContext
│   └── pages/            # Main pages (Manager, Employee, Login, etc.)
├── styles/               # CSS and Tailwind configuration
└── main.tsx             # Entry point
```

## Getting Started

### Installation

```bash
cd Frontend
npm install
```

### Development

```bash
npm run dev
```

Access at `http://localhost:5173`


## Key Pages

- **Landing Page** - Application overview
- **Login Page** - OAuth authentication
- **Manager Portal** - Dashboard with AI chat assistant
- **Employee Page** - Employee information display

## Configuration

Path alias: `@/` resolves to `./src/`

Environment variables (`.env`):
```
VITE_API_URL=http://localhost:8081
VITE_AUTH_DOMAIN=your-auth-domain
VITE_CLIENT_ID=your-client-id
```



 