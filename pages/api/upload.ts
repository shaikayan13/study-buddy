import type { NextApiRequest, NextApiResponse } from 'next'
import { addChunk } from '../../lib/vectorStore'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { text } = req.body
  if(!text) return res.status(400).json({ message: 'No text provided' })
  addChunk(text)
  res.status(200).json({ message: 'Notes ingested', chunks: text.length })
}
