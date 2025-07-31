import express from 'express'
import {
  createTask,
  getTasks,
  updateTask,
  deleteTask
} from '../controllers/taskController.js'
import { verifyToken } from '../middleware/authMiddleware.js'

const router = express.Router()

// Apply authentication middleware to all task routes
router.use(verifyToken)

// Task CRUD routes
router.post('/', createTask)        // Create new task
router.get('/', getTasks)           // Get all tasks for user
router.put('/:id', updateTask)      // Update specific task
router.delete('/:id', deleteTask)   // Delete specific task

export default router
