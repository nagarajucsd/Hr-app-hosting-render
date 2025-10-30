# HR Management App — Render Deployment Guide

This setup runs **frontend + backend** on one Render service.

## Deploy Steps
1. Push this project to **GitHub**.
2. Visit [https://render.com](https://render.com).
3. Create a **New Web Service** → connect your GitHub repo.

**Render Configuration:**
- Root Directory: `/`
- Build Command: `bash render-build.sh`
- Start Command: `node server/server.js`
- Add environment variables from `.env.example`

Frontend + backend will share one domain (e.g., https://your-app.onrender.com).

Use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) for database hosting.
