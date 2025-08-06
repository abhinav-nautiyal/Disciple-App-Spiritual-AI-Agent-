#!/bin/bash

# Exit on any error
set -e

echo "Starting build process..."

# Create static directory
echo "Creating static directory..."
mkdir -p backend/src/static

# Navigate to frontend and install dependencies
echo "Installing frontend dependencies..."
cd frontend

# Install pnpm globally
npm install -g pnpm

# Install dependencies
pnpm install

# Build the frontend
echo "Building frontend..."
pnpm run build

# Copy built files to backend static directory
echo "Copying built files to backend..."
cp -r dist/* ../backend/src/static/

echo "Build completed successfully!" 