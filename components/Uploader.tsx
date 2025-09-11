import dynamic from 'next/dynamic'
import { useState } from 'react'

const PdfUploader = dynamic(() => import('./PdfUploader'), { ssr: false })

export default function Uploader({ onIngest }: { onIngest: (text:string)=>void }) {
  const [text, setText] = useState('')

  const handleIngest = (e: any) => {
    e.preventDefault()
    if(!text) return alert('Paste your notes or upload a PDF!')
    onIngest(text)
    setText('')
    alert('Notes ingested!')
  }

  return (
    <div className="bg-white p-4 rounded-xl shadow flex flex-col gap-2">
      <h3 className="font-semibold">Paste Notes / Upload PDF</h3>
      <form onSubmit={handleIngest} className="flex flex-col gap-2">
        <textarea
          rows={8}
          value={text}
          onChange={e=>setText(e.target.value)}
          className="w-full border rounded p-2 resize-y"
          placeholder="Paste your textbook, notes, or slides here"
        />
        <PdfUploader onIngest={onIngest} />
        <button className="px-4 py-2 bg-indigo-600 text-white rounded">Ingest Notes</button>
      </form>
    </div>
  )
}
