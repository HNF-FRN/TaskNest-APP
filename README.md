# TaskNest-APP

## Project Info

This project contains both a Vite/React frontend and a Node.js/Express backend (in `tasknest-backend`).

---

## Local Development

### Prerequisites
- Node.js & npm installed ([install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating))

### Steps
```sh
# 1. Clone the repository
 git clone <YOUR_GIT_URL>

# 2. Navigate to the project directory
 cd <YOUR_PROJECT_NAME>

# 3. Install dependencies for both frontend and backend
 npm install
 cd tasknest-backend && npm install && cd ..

# 4. Start the backend (in one terminal)
 cd tasknest-backend
 npm run dev

# 5. Start the frontend (in another terminal)
 npm run dev:frontend
```

---

## Railway Deployment

This project is configured for single-domain deployment on Railway, where the backend serves the built frontend. 

**📖 For detailed deployment instructions, see [RAILWAY_DEPLOYMENT.md](./RAILWAY_DEPLOYMENT.md)**

### Quick Setup
1. Connect your GitHub repo to Railway
2. Set environment variables (see deployment guide)
3. Railway will automatically build and deploy

### Key Features
- ✅ Single domain deployment (backend serves frontend)
- ✅ Automatic build process
- ✅ Security middleware included
- ✅ Rate limiting and CORS protection
- ✅ Health check endpoint at `/api/health`

---

## Technologies Used
- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS
- Node.js
- Express
- MongoDB

---

## Custom Domains
To connect a custom domain, use the Railway dashboard under Project > Settings > Domains.

---
