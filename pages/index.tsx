import { useState } from 'react'
import dynamic from 'next/dynamic'
import ChatPanel from '../components/ChatPanel'
import Uploader from '../components/Uploader'
import Header from '../components/Header'

const PdfUploader = dynamic(() => import('../components/PdfUploader'), { ssr: false })

export default function Home() {
  const [notes, setNotes] = useState('')

  return (
    <div className="flex flex-col min-h-screen bg-slate-100">
      <Header />

      <main className="max-w-5xl mx-auto p-4 grid grid-cols-1 md:grid-cols-3 gap-6 mt-6 flex-1">
        <section className="md:col-span-2 flex flex-col gap-6">
          <Uploader onIngest={(text) => setNotes(text)} />
          <PdfUploader onIngest={(text) => setNotes(text)} />
          <ChatPanel notes={notes} />
        </section>

        <aside className="flex flex-col gap-4">
          <div className="bg-white p-4 rounded-xl shadow">
            <h4 className="font-semibold">Tips</h4>
            <ul className="text-sm list-disc list-inside text-slate-600 mt-2">
              <li>Upload or paste notes in small chunks for better results.</li>
              <li>Ask specific questions to get precise answers.</li>
              <li>You can generate quizzes from uploaded notes.</li>
            </ul>
          </div>
        </aside>
      </main>

      <footer className="bg-slate-800 text-white text-center p-4 mt-6">
        &copy; 2025 Shaik Ayan. All rights reserved. StudyBuddy AI.
      </footer>
    </div>
  )
}
