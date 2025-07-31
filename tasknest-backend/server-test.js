// server-test.js - Simple test server without security middleware
import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import cors from 'cors'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import authRoutes from './routes/authRoutes.js'
import taskRoutes from './routes/taskRoutes.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Load .env from the backend directory
dotenv.config({ path: join(__dirname, '.env') })

const app = express()

// Trust proxy for Railway deployment (required for rate limiting)
app.set('trust proxy', 1)

// Basic CORS
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:5173'],
  credentials: true
}))

app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true, limit: '10mb' }))

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() })
})

// API Routes
app.use('/api/auth', authRoutes)
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

const PORT = process.env.PORT || 5000

// Only connect to MongoDB if MONGO_URI is provided
if (process.env.MONGO_URI) {
  mongoose.connect(process.env.MONGO_URI)
    .then(() => {
      console.log('Connected to MongoDB')
      startServer()
    })
    .catch(err => {
      console.error('MongoDB connection error:', err)
      process.exit(1)
    })
} else {
  console.log('No MONGO_URI provided, starting server without database')
  startServer()
}

function startServer() {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`)
  })
} 