#!/bin/bash
# Simplified Render Build Script for single-repo React + Node app

# Install all dependencies (root)
npm install

# Build frontend (React)
npm run build

# Install server dependencies (if package.json exists inside /server)
if [ -d "server" ] && [ -f "server/package.json" ]; then
  cd server
  npm install
  cd ..
fi
