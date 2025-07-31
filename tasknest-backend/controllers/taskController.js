import Task from '../models/Task.js'

export const createTask = async (req, res) => {
  try {
    const { title, description, status, deadline } = req.body
    
    if (!title) {
      return res.status(400).json({ error: 'Title is required' })
    }

    const task = new Task({
      title,
      description: description || '',
      status: status || 'todo',
      deadline: deadline || null,
      userId: req.userId
    })

    await task.save()
    res.status(201).json(task)
  } catch (error) {
    console.error('Create task error:', error)
    res.status(500).json({ error: 'Failed to create task' })
  }
}

export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.userId }).sort({ createdAt: -1 })
    res.json(tasks)
  } catch (error) {
    console.error('Get tasks error:', error)
    res.status(500).json({ error: 'Failed to fetch tasks' })
  }
}

export const updateTask = async (req, res) => {
  try {
    const { title, description, status, deadline } = req.body
    const { id } = req.params

    if (!id) {
      return res.status(400).json({ error: 'Task ID is required' })
    }

    const updateData = {}
    if (title !== undefined) updateData.title = title
    if (description !== undefined) updateData.description = description
    if (status !== undefined) updateData.status = status
    if (deadline !== undefined) updateData.deadline = deadline

    const task = await Task.findOneAndUpdate(
      { _id: id, userId: req.userId },
      updateData,
      { new: true, runValidators: true }
    )

    if (!task) {
      return res.status(404).json({ error: 'Task not found' })
    }

    res.json(task)
  } catch (error) {
    console.error('Update task error:', error)
    if (error.name === 'ValidationError') {
      return res.status(400).json({ error: error.message })
    }
    res.status(500).json({ error: 'Failed to update task' })
  }
}

export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params

    if (!id) {
      return res.status(400).json({ error: 'Task ID is required' })
    }

    const task = await Task.findOneAndDelete({ _id: id, userId: req.userId })

    if (!task) {
      return res.status(404).json({ error: 'Task not found' })
    }

    res.json({ message: 'Task deleted successfully' })
  } catch (error) {
    console.error('Delete task error:', error)
    res.status(500).json({ error: 'Failed to delete task' })
  }
}
