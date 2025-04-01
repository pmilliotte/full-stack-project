# 🚀 My Project

A modern full-stack TypeScript monorepo with React frontend and tRPC backend, built for developer happiness! ✨

## 📁 Project Structure

```
.
├── apps/
│   ├── frontend/     # ⚡️ React + Vite frontend application
│   └── backend/      # 🔧 tRPC + Express backend application
├── packages/
│   ├── shared/       # 🤝 Shared utilities and types
│   └── storage/      # 💾 Database and storage utilities
└── package.json      # 📦 Root package.json for workspace management
```

## 🛠️ Prerequisites

- Node.js (v20 or later) ⚡️
- PNPM (v8.15.4 or later) 📦
- Docker (for running the database) 🐳

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone <repository-url>
cd my-project
```

### 2. Install Dependencies

```bash
pnpm install
```

### 3. 🗄️ Database Setup

The project uses Prisma for ORM. After install, run this command to generate the client :

```bash
# Generated Prisma client
cd packages/storage && pnpm prisma:generate
```

The project uses Supabase for the database, even in local development. Supabase runs in Docker containers, providing a consistent development environment.

To start the local Supabase instance:

```bash
# Change to the storage directory
cd packages/storage

# Start the database
pnpm db:up

# Once the database is running, apply the migrations
pnpm prisma:migrate:dev

# To stop the database
pnpm db:stop
```

### 4. 🔐 Environment Setup

The project uses multiple environment files for different contexts. You'll need to set up the env variables in local `.env` :

```bash
# Backend environment
cp apps/backend/.env.example apps/backend/.env

# Frontend environment
cp apps/frontend/.env.example apps/frontend/.env
```

### 5. 🚀 Starting the Development Environment

Start the services in separate terminals:

```bash
# Terminal 1 - Database
cd packages/storage && pnpm db:up

# Terminal 2 - Backend
cd apps/backend && pnpm dev:backend

# Terminal 3 - Frontend
cd apps/frontend && pnpm dev:frontend
```

The services will be available at:

- 🌐 Frontend: http://localhost:3000
- 🔧 Backend: http://localhost:3001
- 🗄️ Database: localhost:5432

## 🛠️ Development Commands

- `pnpm dev:frontend` - 🚀 Start frontend development server
- `pnpm dev:backend` - 🔧 Start backend development server
- `pnpm db:up` - 🗄️ Start the local Supabase instance
- `pnpm db:stop` - ⏹️ Stop the local Supabase instance
- `pnpm prisma:migrate:dev` - 📝 Apply database migrations
- `pnpm prisma:studio` - 🔍 Open Prisma Studio to view and edit data
- `pnpm test` - 🧪 Run tests
- `pnpm lint` - ✨ Run linting

## 🏗️ Build Process

The project uses a combination of TypeScript's project references and esbuild for efficient builds:

- **Type Checking**: TypeScript project references (`tsc -b`) are used for type checking across the monorepo
- **Backend Builds**: esbuild is used for fast production builds of the backend application

### Build Commands

```bash
# Type check the entire project
pnpm typecheck

# Build for staging
pnpm build --stage=staging

# Build for production
pnpm build --stage=production
```

The build process will:

1. Type check all packages and applications
2. Build shared packages (only declarations)
3. Build the backend application with esbuild
4. Build the frontend application with Vite

## 🛠️ Tech Stack

- **Frontend:**

  - ⚛️ React
  - ⚡️ Vite
  - 🔄 tRPC Client
  - 📘 TypeScript

- **Backend:**

  - 🚂 Express
  - 🔄 tRPC Server
  - 📘 TypeScript

- **Database:**

  - 🐘 PostgreSQL (via Supabase)
  - 🔄 Prisma ORM
  - 🐳 Docker (for local development)

- **Shared:**

  - 📘 TypeScript
  - ⚡️ ESBuild

- **DevOps:**
  - 🏗️ NX
  - 📦 PNPM Workspaces
  - 🐳 Docker

## 📄 License

MIT
