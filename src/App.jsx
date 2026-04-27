import { useState } from 'react'
import Overview from './pages/Overview'
import Users    from './pages/Users'
import Logs     from './pages/Logs'

const NAV = [
  { id: 'overview', label: 'Overview'  },
  { id: 'users',    label: 'Users'     },
  { id: 'logs',     label: 'API Logs'  },
]

export default function App() {
  const [page, setPage] = useState('overview')

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-52 bg-white border-r border-gray-200 flex flex-col shrink-0">
        <div className="px-5 py-5 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-blue-600 rounded-md flex items-center justify-center">
              <span className="text-white text-xs font-bold">A</span>
            </div>
            <span className="text-sm font-semibold text-gray-900">Admin Panel</span>
          </div>
        </div>
        <nav className="flex-1 px-3 py-4 space-y-1">
          {NAV.map(n => (
            <button key={n.id} onClick={() => setPage(n.id)}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${page === n.id ? 'bg-blue-50 text-blue-700 font-medium' : 'text-gray-600 hover:bg-gray-50'}`}>
              {n.label}
            </button>
          ))}
        </nav>
        <div className="px-5 py-4 border-t border-gray-100">
          <p className="text-xs text-gray-400">Logged in as Admin</p>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto">
        {page === 'overview' && <Overview />}
        {page === 'users'    && <Users />}
        {page === 'logs'     && <Logs />}
      </main>
    </div>
  )
}