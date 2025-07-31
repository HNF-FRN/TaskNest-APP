# Use Node.js 18 Alpine for smaller image size
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./
COPY tasknest-backend/package*.json ./tasknest-backend/

# Install dependencies
RUN npm ci --only=production
RUN cd tasknest-backend && npm ci --only=production

# Copy source code
COPY . .

# Build frontend
RUN npm run build

# Set environment variables
ENV NODE_ENV=production
ENV PORT=5000

# Expose port
EXPOSE 5000

# Start the application
CMD ["npm", "start"] 