#!/bin/bash

echo "Checking Kokoro FastAPI service status..."

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "Docker is not running. Please start Docker first."
    exit 1
fi

# Check if container is already running
if docker ps --format '{{.Names}}' | grep -q "kokoro"; then
    echo "Kokoro FastAPI service is already running"
    exit 0
fi

echo "Starting Kokoro FastAPI service..."

# Start the service using docker-compose
docker compose up -d

echo "Kokoro FastAPI service is starting up..."
echo "The service will be available at http://localhost:8880"
echo "Wait a few moments for the model to load..."

# Wait for the service to be ready
echo "Checking service health..."
until $(curl --output /dev/null --silent --fail http://localhost:8880/health); do
    printf '.'
    sleep 2
done

echo -e "\nKokoro FastAPI service is ready!"