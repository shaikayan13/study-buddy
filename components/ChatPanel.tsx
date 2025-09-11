import { useState } from 'react'

export default function ChatPanel({ notes }: { notes: string }) {
  const [question, setQuestion] = useState('')
  const [answer, setAnswer] = useState('')

  const handleAsk = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!question) return
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question, notes })
      })
      const data = await res.json()
      setAnswer(data.answer)
      setQuestion('')
    } catch (err) {
      console.error(err)
      setAnswer('Error asking the question')
    }
  }

  return (
    <div className="bg-white p-4 rounded-xl shadow flex flex-col gap-2">
      <h3 className="font-semibold">Ask questions</h3>
      <form onSubmit={handleAsk} className="flex gap-2">
        <input
          type="text"
          value={question}
          onChange={e => setQuestion(e.target.value)}
          placeholder="Type your question..."
          className="flex-1 border rounded p-2"
        />
        <button className="px-4 py-2 bg-indigo-600 text-white rounded">Ask</button>
      </form>
      {answer && (
        <div className="mt-4 p-2 border rounded bg-slate-50 whitespace-pre-wrap">{answer}</div>
      )}
    </div>
  )
}
