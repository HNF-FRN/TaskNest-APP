import User from '../models/User.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const register = async (req, res) => {
  const { username, email, password } = req.body
  const hashed = await bcrypt.hash(password, 10)
  const user = new User({ username, email, password: hashed })
  await user.save()
  res.status(201).json({ message: 'User registered' })
}

export const login = async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })
  if (!user) return res.status(404).json({ error: 'User not found' })
  const match = await bcrypt.compare(password, user.password)
  if (!match) return res.status(401).json({ error: 'Invalid credentials' })
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' })
  res.json({ token })
}
