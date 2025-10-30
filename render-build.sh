#!/bin/bash
# Render Build Script
cd frontend || cd .
npm install
npm run build
cd ../server
npm install
