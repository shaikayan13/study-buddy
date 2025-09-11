import React from 'react'

export default function Header() {
  return (
    <header className="w-full bg-white/60 backdrop-blur sticky top-0 z-30 shadow-sm">
      <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-600 to-pink-500 flex items-center justify-center text-white font-bold">SB</div>
          <div>
            <h1 className="text-lg font-semibold">StudyBuddy</h1>
            <p className="text-xs text-slate-500">Upload notes. Ask. Learn. by shaik ayan</p>
          </div>
        </div>
      </div>
    </header>
  )
}
