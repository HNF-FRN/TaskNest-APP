// server.js
import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import cors from 'cors'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import authRoutes from './routes/authRoutes.js'
import taskRoutes from './routes/taskRoutes.js'
import { helmetConfig, limiter, authLimiter, corsOptions } from './middleware/securityMiddleware.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Load .env from the backend directory
dotenv.config({ path: join(__dirname, '.env') })

const app = express()

// Security middleware
app.use(helmetConfig)
app.use(cors(corsOptions))
app.use(limiter) // Apply rate limiting to all routes

app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true, limit: '10mb' }))

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() })
})

// API Routes with rate limiting for auth
app.use('/api/auth', authLimiter, authRoutes)
app.use('/api/tasks', taskRoutes)

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  const frontendPath = join(__dirname, '../dist')
  console.log('Serving static files from:', frontendPath)
  app.use(express.static(frontendPath))
  
  // Serve React app for any non-API routes
  app.get('*', (req, res) => {
    if (!req.path.startsWith('/api/')) {
      res.sendFile(join(frontendPath, 'index.html'))
    }
  })
}

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err)
  res.status(500).json({ error: 'Internal server error' })
})

// Check if required environment variables are set
if (!process.env.MONGO_URI) {
  console.error('MONGO_URI is not set in environment variables')
  process.exit(1)
}

if (!process.env.JWT_SECRET) {
  console.error('JWT_SECRET is not set in environment variables')
  process.exit(1)
}

const PORT = process.env.PORT || 5000

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB')
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`)
      console.log(`Environment: ${process.env.NODE_ENV || 'development'}`)
    })
  })
  .catch(err => {
    console.error('MongoDB connection error:', err)
    process.exit(1)
  })

