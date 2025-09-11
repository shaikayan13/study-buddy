"use client" // important — ensures this runs only on the client

import { useState, useEffect } from 'react'

export default function PdfUploader({ onIngest }: { onIngest: (text: string) => void }) {
  const [pdfjsLib, setPdfjsLib] = useState<any>(null)
  const [text, setText] = useState('')

  useEffect(() => {
    import('pdfjs-dist/build/pdf').then((pdfjs) => {
      pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`
      setPdfjsLib(pdfjs)
    })
  }, [])

  const handlePdfUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!pdfjsLib) return
    const file = e.target.files?.[0]
    if (!file) return

    const arrayBuffer = await file.arrayBuffer()
    const pdf = await pdfjsLib.getDocument(arrayBuffer).promise

    let fullText = ''
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i)
      const content = await page.getTextContent()
      const pageText = content.items.map((item: any) => item.str).join(' ')
      fullText += pageText + '\n\n'
    }

    setText(fullText)
    onIngest(fullText)
    alert('PDF notes ingested!')
  }

  return (
    <div className="flex flex-col gap-2">
      <input
        type="file"
        accept="application/pdf"
        onChange={handlePdfUpload}
        className="border rounded p-2"
      />
      {text && <textarea readOnly value={text} className="w-full border rounded p-2 h-32" />}
    </div>
  )
}
