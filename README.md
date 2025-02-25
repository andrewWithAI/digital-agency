# Digital Agency Monorepo

This is a monorepo project built with [Turborepo](https://turbo.build/) containing a [Next.js](https://nextjs.org) frontend and an [Express.js](https://expressjs.com/) backend API.

## Project Structure

```
digital-agency/
├── apps/
│   ├── web/           # Next.js frontend application
│   └── api/           # Express.js backend API
├── packages/
│   ├── ui/            # Shared UI components
│   ├── types/         # Shared TypeScript types
│   └── config/        # Shared configuration
├── kubernetes/        # Kubernetes configuration files
└── docker-compose.yml # Docker Compose configuration
```

## Prerequisites

- [Node.js](https://nodejs.org/) v18 or later
- [npm](https://www.npmjs.com/) v8 or later (project uses npm v10.2.3)
- [Docker](https://docs.docker.com/get-docker/) and [Docker Compose](https://docs.docker.com/compose/install/) (optional, for Docker-based development)

## Running Locally

There are two main ways to run this project locally:

### Method 1: Using npm/Node.js Directly

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Build shared packages**
   The monorepo contains shared packages that need to be built first:
   ```bash
   npm run build --workspace=types
   npm run build --workspace=ui
   npm run build --workspace=config
   ```

3. **Run the development server**
   To run both the frontend and backend in development mode:
   ```bash
   npm run dev
   ```

   This will start:
   - Next.js frontend at http://localhost:3000
   - Express API at http://localhost:4000

   The frontend uses Turbopack for faster development builds.

### Method 2: Using Docker Compose

1. **Development Mode (with hot-reloading)**
   To run both services with hot-reloading:
   ```bash
   docker-compose up web-dev api-dev
   ```

   Or run them individually:
   ```bash
   # Frontend only
   docker-compose up web-dev

   # Backend only
   docker-compose up api-dev
   ```

   This will:
   - Mount your local files into the containers
   - Enable hot-reloading
   - Make the frontend available at http://localhost:3000
   - Make the API available at http://localhost:4000

2. **Production Mode**
   To run optimized production builds:
   ```bash
   docker-compose up web api
   ```

   Or run them individually:
   ```bash
   # Frontend only
   docker-compose up web

   # Backend only
   docker-compose up api
   ```

## Available Scripts

- `npm run dev`: Run all applications in development mode
- `npm run build`: Build all applications and packages
- `npm run start`: Start all applications in production mode
- `npm run lint`: Lint all applications and packages
- `npm run format`: Format code with Prettier

## Technologies

- **Frontend**: Next.js 15 with React 19, Tailwind CSS
- **Backend**: Express.js with TypeScript
- **Shared Packages**: Custom UI components, TypeScript types, and configurations
- **DevOps**: Docker, Kubernetes configurations for deployment

## Learn More

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API
- [Turborepo Documentation](https://turbo.build/repo/docs) - learn about Turborepo features
- [Express.js Documentation](https://expressjs.com/) - learn about Express.js

## Deployment

For detailed deployment instructions, see the [Docker README](./docker-README.md) which includes information about:

- Docker configuration
- Kubernetes deployment
- Google Cloud Platform setup
- CI/CD with Cloud Build
