import { useEffect, useState } from 'react'

function App() {
  const [apiMessage, setApiMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || ''

  const fetchHello = async () => {
    try {
      setLoading(true)
      setError('')
      const base = BACKEND_URL.replace(/\/$/, '')
      const res = await fetch(`${base}/api/hello`)
      const data = await res.json()
      setApiMessage(data?.message || 'No message')
    } catch (e) {
      setError('Could not reach the backend API')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    // Try to auto-fetch if backend URL is provided
    if (BACKEND_URL) {
      fetchHello()
    }
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-indigo-50 flex items-center justify-center p-6">
      <div className="w-full max-w-xl bg-white/80 backdrop-blur rounded-xl shadow-lg border border-white/60 p-8 text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-3">Hello, World! 👋</h1>
        <p className="text-gray-600 mb-8">A tiny app that greets you from the browser, and optionally from the backend API.</p>

        <div className="space-y-4">
          <div className="p-4 rounded-lg bg-gray-50 border border-gray-200">
            <p className="text-gray-800">Frontend says: <span className="font-semibold">Hello from React</span></p>
          </div>

          <div className="p-4 rounded-lg bg-gray-50 border border-gray-200">
            <p className="text-gray-800">Backend says: {loading ? 'Loading…' : apiMessage ? <span className="font-semibold">{apiMessage}</span> : '—'}</p>
            {error && <p className="text-red-600 mt-2 text-sm">{error}</p>}
          </div>

          <button
            onClick={fetchHello}
            className="inline-flex items-center justify-center px-4 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700 active:scale-[0.99] transition"
          >
            Fetch backend greeting
          </button>

          {!BACKEND_URL && (
            <p className="text-xs text-gray-500">Tip: set VITE_BACKEND_URL to enable automatic API fetching.</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default App
