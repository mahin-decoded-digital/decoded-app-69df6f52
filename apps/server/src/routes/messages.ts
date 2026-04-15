import { Router } from 'express'
import { db } from '../lib/db.js'

const router = Router()

// GET /api/messages — list all
router.get('/', async (req, res) => {
  let messages = await db.collection('messages').find()
  
  // Seed initial "Hello World" message if empty
  if (messages.length === 0) {
    await db.collection('messages').insertOne({ text: 'Hello World' })
    messages = await db.collection('messages').find()
  }
  
  res.json(messages)
})

// GET /api/messages/:id — get one
router.get('/:id', async (req, res) => {
  const message = await db.collection('messages').findById(req.params.id)
  if (!message) return res.status(404).json({ error: 'Not found' })
  res.json(message)
})

// POST /api/messages — create
router.post('/', async (req, res) => {
  const id = await db.collection('messages').insertOne(req.body)
  const message = await db.collection('messages').findById(id)
  res.status(201).json(message)
})

// PUT /api/messages/:id — update
router.put('/:id', async (req, res) => {
  const ok = await db.collection('messages').updateOne(req.params.id, req.body)
  if (!ok) return res.status(404).json({ error: 'Not found' })
  const message = await db.collection('messages').findById(req.params.id)
  res.json(message)
})

// DELETE /api/messages/:id — delete
router.delete('/:id', async (req, res) => {
  const ok = await db.collection('messages').deleteOne(req.params.id)
  if (!ok) return res.status(404).json({ error: 'Not found' })
  res.json({ success: true })
})

export default router