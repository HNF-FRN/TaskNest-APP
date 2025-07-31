# Railway Deployment Guide

This guide will help you deploy your MERN stack application on Railway with the backend serving the built frontend from a single domain.

## Prerequisites

- Railway account
- GitHub repository connected to Railway
- MongoDB database (MongoDB Atlas recommended)

## Deployment Steps

### 1. Connect Repository to Railway

1. Go to [Railway Dashboard](https://railway.app/dashboard)
2. Click "New Project"
3. Select "Deploy from GitHub repo"
4. Choose your repository
5. Railway will automatically detect the Node.js project

### 2. Configure Environment Variables

In your Railway project dashboard, go to the "Variables" tab and add the following environment variables:

#### Required Variables
```
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/tasknest?retryWrites=true&w=majority
JWT_SECRET=your-super-secret-jwt-key-here
NODE_ENV=production
PORT=5000
```

#### Optional Variables (for enhanced security)
```
FRONTEND_URL=https://your-app-name.railway.app
RAILWAY_STATIC_URL=https://your-app-name.railway.app
```

### 3. Build Configuration

Railway will automatically:
1. Run `npm install` (installs both frontend and backend dependencies)
2. Run `npm run postinstall` (builds the frontend and installs backend dependencies)
3. Run `npm start` (starts the backend server)

### 4. Domain Configuration

- Railway will provide a default domain: `https://your-app-name.railway.app`
- You can add a custom domain in the "Settings" tab

## Environment Variables Explained

### MONGO_URI
- Your MongoDB connection string
- Format: `mongodb+srv://username:password@cluster.mongodb.net/database-name?retryWrites=true&w=majority`
- Get this from MongoDB Atlas dashboard

### JWT_SECRET
- Secret key for JWT token signing
- Should be a long, random string
- Example: `my-super-secret-jwt-key-that-is-very-long-and-random`

### NODE_ENV
- Set to `production` for Railway deployment
- Enables production optimizations and security features

### PORT
- Railway will automatically set this
- Default: `5000` (fallback)

## Security Features Included

### Rate Limiting
- General routes: 100 requests per 15 minutes per IP
- Auth routes: 5 requests per 15 minutes per IP

### Security Headers (Helmet)
- Content Security Policy
- XSS Protection
- No Sniff
- Frame Options
- And more...

### CORS Configuration
- Production: Allows Railway domains
- Development: Allows localhost ports

## Troubleshooting

### Build Issues
1. Check that all dependencies are in `package.json`
2. Ensure `postinstall` script runs correctly
3. Verify Vite build output goes to `dist/` folder

### Runtime Issues
1. Check Railway logs for errors
2. Verify environment variables are set
3. Ensure MongoDB connection string is correct

### Frontend Not Loading
1. Check that `dist/` folder exists after build
2. Verify static file serving in `server.js`
3. Check CORS configuration

## Monitoring

### Railway Dashboard
- View real-time logs
- Monitor resource usage
- Check deployment status

### Health Check Endpoint
- Available at: `https://your-app-name.railway.app/api/health`
- Returns server status and timestamp

## Custom Domain Setup

1. Go to Railway project "Settings"
2. Click "Domains"
3. Add your custom domain
4. Update DNS records as instructed
5. Update `FRONTEND_URL` environment variable

## Performance Optimization

### Production Build
- Frontend is built with Vite for optimal performance
- Static files are served efficiently
- API routes are optimized

### Database
- Use MongoDB Atlas for global distribution
- Enable connection pooling
- Monitor query performance

## Security Checklist

- [ ] Environment variables are set
- [ ] JWT_SECRET is strong and unique
- [ ] MongoDB connection uses SSL
- [ ] Rate limiting is enabled
- [ ] Security headers are configured
- [ ] CORS is properly configured
- [ ] No sensitive data in logs
- [ ] Custom domain uses HTTPS

## Support

If you encounter issues:
1. Check Railway documentation
2. Review application logs
3. Verify environment configuration
4. Test locally with production settings 