import { Router } from 'express'
import { db } from '../lib/db.js'

const router = Router()

// GET /api/interactions — list all
router.get('/', async (req, res) => {
  const interactions = await db.collection('interactions').find()
  res.json(interactions)
})

// POST /api/interactions — create
router.post('/', async (req, res) => {
  await db.collection('interactions').insertOne(req.body)
  const interactions = await db.collection('interactions').find()
  res.status(201).json({ totalVisits: interactions.length })
})

export default router