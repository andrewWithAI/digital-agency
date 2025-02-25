#!/bin/bash
set -e

# Check if required tools are installed
command -v gcloud >/dev/null 2>&1 || { echo "Google Cloud SDK is required but not installed. Aborting."; exit 1; }
command -v kubectl >/dev/null 2>&1 || { echo "kubectl is required but not installed. Aborting."; exit 1; }
command -v docker >/dev/null 2>&1 || { echo "Docker is required but not installed. Aborting."; exit 1; }

# Configuration variables - modify these as needed
PROJECT_ID=""
CLUSTER_NAME="digital-agency-cluster"
CLUSTER_ZONE="us-central1-a"
CLUSTER_NODES=3
MACHINE_TYPE="e2-standard-2"

# Prompt for project ID if not set
if [ -z "$PROJECT_ID" ]; then
  echo "Enter your Google Cloud Project ID:"
  read PROJECT_ID
  if [ -z "$PROJECT_ID" ]; then
    echo "Project ID is required. Aborting."
    exit 1
  fi
fi

echo "=== Setting up GKE deployment for Digital Agency Monorepo ==="
echo "Project ID: $PROJECT_ID"
echo "Cluster: $CLUSTER_NAME in $CLUSTER_ZONE"
echo

# Set the project
echo "Setting Google Cloud project..."
gcloud config set project $PROJECT_ID

# Enable required APIs
echo "Enabling required Google Cloud APIs..."
gcloud services enable container.googleapis.com cloudbuild.googleapis.com containerregistry.googleapis.com

# Create GKE cluster if it doesn't exist
if ! gcloud container clusters describe $CLUSTER_NAME --zone $CLUSTER_ZONE &>/dev/null; then
  echo "Creating GKE cluster $CLUSTER_NAME..."
  gcloud container clusters create $CLUSTER_NAME \
    --zone $CLUSTER_ZONE \
    --num-nodes $CLUSTER_NODES \
    --machine-type $MACHINE_TYPE
else
  echo "GKE cluster $CLUSTER_NAME already exists."
fi

# Configure kubectl
echo "Configuring kubectl..."
gcloud container clusters get-credentials $CLUSTER_NAME --zone $CLUSTER_ZONE

# Update deployment.yaml with the correct project ID
echo "Updating Kubernetes deployment configuration..."
sed -i.bak "s|gcr.io/YOUR_GCP_PROJECT_ID/digital-agency-web|gcr.io/$PROJECT_ID/digital-agency-web|g" kubernetes/deployment.yaml
sed -i.bak "s|gcr.io/YOUR_GCP_PROJECT_ID/digital-agency-api|gcr.io/$PROJECT_ID/digital-agency-api|g" kubernetes/deployment.yaml
rm -f kubernetes/deployment.yaml.bak

# Install dependencies and build packages
echo "Installing dependencies and building packages..."
npm ci
npm run build

# Build and push Docker images
echo "Building and pushing Docker images..."

echo "Building web Docker image..."
docker build -t gcr.io/$PROJECT_ID/digital-agency-web:latest -f apps/web/Dockerfile .

echo "Building API Docker image..."
docker build -t gcr.io/$PROJECT_ID/digital-agency-api:latest -f apps/api/Dockerfile .

echo "Pushing web Docker image to Google Container Registry..."
docker push gcr.io/$PROJECT_ID/digital-agency-web:latest

echo "Pushing API Docker image to Google Container Registry..."
docker push gcr.io/$PROJECT_ID/digital-agency-api:latest

# Deploy to GKE
echo "Deploying to GKE..."
kubectl apply -k kubernetes/

# Set up Cloud Build (optional)
echo
echo "Do you want to set up CI/CD with Cloud Build? (y/n)"
read setup_cloudbuild

if [ "$setup_cloudbuild" = "y" ] || [ "$setup_cloudbuild" = "Y" ]; then
  echo "Setting up Cloud Build..."
  
  # Grant Cloud Build service account Kubernetes Engine Developer role
  PROJECT_NUMBER=$(gcloud projects describe $PROJECT_ID --format='value(projectNumber)')
  gcloud projects add-iam-policy-binding $PROJECT_ID \
    --member=serviceAccount:$PROJECT_NUMBER@cloudbuild.gserviceaccount.com \
    --role=roles/container.developer
  
  echo "Cloud Build service account configured."
  echo
  echo "To create a Cloud Build trigger, run:"
  echo "gcloud builds triggers create github --repo=your-github-repo --branch-pattern=main --build-config=cloudbuild.yaml"
fi

echo
echo "=== Deployment Complete ==="
echo "To check the status of your deployment:"
echo "kubectl get pods"
echo
echo "To get the external IP of your service (may take a few minutes):"
echo "kubectl get ingress digital-agency-ingress"
echo
echo "For more information, see docker-README.md"