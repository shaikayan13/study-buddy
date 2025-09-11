import type { NextApiRequest, NextApiResponse } from 'next'
import { openai } from '../../lib/openai'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { question, notes } = req.body
  if(!question || !notes) return res.status(400).json({ answer: 'Missing question or notes' })

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: 'You are a helpful AI tutor.' },
        { role: 'user', content: `Notes:\n${notes}\n\nQuestion: ${question}` }
      ]
    })
    res.status(200).json({ answer: completion.choices[0].message?.content })
  } catch (err) {
    res.status(500).json({ answer: 'OpenAI error: ' + err })
  }
}
