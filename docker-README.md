# Docker and Kubernetes Setup for Digital Agency Monorepo

This document provides instructions for running the Digital Agency monorepo application using Docker and deploying it to Google Kubernetes Engine (GKE).

## Monorepo Structure

The project is organized as a monorepo with the following structure:

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

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/) (usually included with Docker Desktop)
- [Google Cloud SDK](https://cloud.google.com/sdk/docs/install)
- [kubectl](https://kubernetes.io/docs/tasks/tools/install-kubectl/)
- [Node.js](https://nodejs.org/) (v18 or later)
- [npm](https://www.npmjs.com/) (v8 or later)

## Docker Configuration Files

- `apps/web/Dockerfile`: Multi-stage build configuration for the Next.js frontend
- `apps/api/Dockerfile`: Multi-stage build configuration for the Express.js API
- `.dockerignore`: Specifies files to exclude from the Docker build context
- `docker-compose.yml`: Defines services for both development and production environments

## Kubernetes Configuration Files

- `kubernetes/deployment.yaml`: Defines the Kubernetes deployments for web and API
- `kubernetes/service.yaml`: Defines the services and ingress for exposing the applications
- `kubernetes/hpa.yaml`: Configures horizontal pod autoscaling for both services
- `kubernetes/kustomization.yaml`: Organizes Kubernetes resources for easier deployment
- `cloudbuild.yaml`: Configures CI/CD with Google Cloud Build

## Local Development

### Install Dependencies

```bash
# Install all dependencies
npm install

# Build shared packages
npm run build --workspace=types
npm run build --workspace=ui
npm run build --workspace=config
```

### Development Mode

To run the application in development mode with hot-reloading:

```bash
# Run both web and API in development mode
docker-compose up web-dev api-dev

# Run only the web frontend
docker-compose up web-dev

# Run only the API backend
docker-compose up api-dev
```

This will:
- Build the Docker images using the builder stage
- Mount your local files into the containers
- Run the development servers with hot-reloading
- Make the applications available at:
  - Frontend: http://localhost:3000
  - API: http://localhost:4000

### Production Mode

To run the application in production mode locally:

```bash
# Run both web and API in production mode
docker-compose up web api

# Run only the web frontend
docker-compose up web

# Run only the API backend
docker-compose up api
```

This will:
- Build the complete Docker images with optimized production builds
- Run the standalone servers
- Make the applications available at:
  - Frontend: http://localhost:3000
  - API: http://localhost:4000

## Deploying to Google Kubernetes Engine (GKE)

### Automated Deployment

The easiest way to deploy is using the provided script:

```bash
# Make the script executable
chmod +x gke-deploy.sh

# Run the deployment script
./gke-deploy.sh
```

Follow the interactive prompts to configure your GKE environment.

### Manual Deployment

#### 1. Set Up Google Cloud Project

```bash
# Set your project ID
export PROJECT_ID=your-gcp-project-id
gcloud config set project $PROJECT_ID

# Enable required APIs
gcloud services enable container.googleapis.com cloudbuild.googleapis.com containerregistry.googleapis.com
```

#### 2. Create a GKE Cluster

```bash
gcloud container clusters create digital-agency-cluster \
  --zone us-central1-a \
  --num-nodes 3 \
  --machine-type e2-standard-2
```

#### 3. Configure kubectl

```bash
gcloud container clusters get-credentials digital-agency-cluster --zone us-central1-a
```

#### 4. Build and Push Docker Images

```bash
# Build and push web image
docker build -t gcr.io/$PROJECT_ID/digital-agency-web:latest -f apps/web/Dockerfile .
docker push gcr.io/$PROJECT_ID/digital-agency-web:latest

# Build and push API image
docker build -t gcr.io/$PROJECT_ID/digital-agency-api:latest -f apps/api/Dockerfile .
docker push gcr.io/$PROJECT_ID/digital-agency-api:latest
```

#### 5. Update Kubernetes Deployment

Edit `kubernetes/deployment.yaml` to replace `YOUR_GCP_PROJECT_ID` with your actual project ID.

#### 6. Deploy to GKE

```bash
# Apply all resources using kustomize
kubectl apply -k kubernetes/
```

#### 7. Set Up CI/CD with Cloud Build (Optional)

```bash
# Grant Cloud Build service account Kubernetes Engine Developer role
export PROJECT_NUMBER=$(gcloud projects describe $PROJECT_ID --format='value(projectNumber)')
gcloud projects add-iam-policy-binding $PROJECT_ID \
  --member=serviceAccount:$PROJECT_NUMBER@cloudbuild.gserviceaccount.com \
  --role=roles/container.developer

# Create a Cloud Build trigger
gcloud builds triggers create github \
  --repo=your-github-repo \
  --branch-pattern=main \
  --build-config=cloudbuild.yaml
```

## Monitoring and Scaling

- View logs: 
  - Web: `kubectl logs deployment/digital-agency-web`
  - API: `kubectl logs deployment/digital-agency-api`
- Check pod status: `kubectl get pods`
- View HPA status: 
  - Web: `kubectl get hpa digital-agency-web-hpa`
  - API: `kubectl get hpa digital-agency-api-hpa`
- Scale manually: 
  - Web: `kubectl scale deployment/digital-agency-web --replicas=5`
  - API: `kubectl scale deployment/digital-agency-api --replicas=3`

## Environment Variables

To add environment variables:

1. Add them to the `env` section in `kubernetes/deployment.yaml`
2. For sensitive data, use Kubernetes secrets:

```bash
# Create a secret
kubectl create secret generic digital-agency-secrets \
  --from-literal=API_KEY=your-api-key

# Reference in deployment.yaml
# env:
# - name: API_KEY
#   valueFrom:
#     secretKeyRef:
#       name: digital-agency-secrets
#       key: API_KEY
```

## Customizing the Setup

- Modify the Dockerfiles to add custom build steps or dependencies
- Update Kubernetes configurations for specific GKE optimizations
- Adjust the Next.js configuration in `apps/web/next.config.ts` for specific optimizations
- Add new shared packages in the `packages/` directory