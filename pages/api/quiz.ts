import type { NextApiRequest, NextApiResponse } from 'next'
import { openai } from '../../lib/openai'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { notes } = req.body
  if(!notes) return res.status(400).json({ message: 'No notes provided' })

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: 'Generate 5 quiz questions from these notes.' },
        { role: 'user', content: `Notes:\n${notes}` }
      ]
    })
    res.status(200).json({ quiz: completion.choices[0].message?.content })
  } catch (err) {
    res.status(500).json({ message: 'OpenAI error: ' + err })
  }
}

