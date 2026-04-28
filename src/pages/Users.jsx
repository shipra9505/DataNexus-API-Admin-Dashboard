import { useState } from 'react'

const USERS = [
  { id:1, name:'Rahul Sharma',   email:'rahul@flipkart.com',  plan:'Pro',       status:'Active',   requests:284000, joined:'2024-01-10' },
  { id:2, name:'Priya Nair',     email:'priya@swiggy.in',     plan:'Premium',   status:'Active',   requests:38000,  joined:'2024-01-14' },
  { id:3, name:'Amit Verma',     email:'amit@startup.io',     plan:'Free',      status:'Pending',  requests:0,      joined:'2024-01-15' },
  { id:4, name:'Sneha Reddy',    email:'sneha@logistic.co',   plan:'Unlimited', status:'Active',   requests:920000, joined:'2023-12-01' },
  { id:5, name:'Rohan Mehta',    email:'rohan@ecom.in',       plan:'Free',      status:'Suspended',requests:4800,   joined:'2024-01-08' },
]

const STATUS_STYLE = {
  Active:    'bg-green-50 text-green-700',
  Pending:   'bg-yellow-50 text-yellow-700',
  Suspended: 'bg-red-50 text-red-600',
}

export default function Users() {
  const [search, setSearch]   = useState('')
  const [filter, setFilter]   = useState('All')

  const filtered = USERS.filter(u =>
    (filter === 'All' || u.status === filter) &&
    (u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase()))
  )

  return (
    <div className="p-8 space-y-4">
      <h1 className="text-lg font-semibold text-gray-900">User management</h1>

      <div className="flex gap-3">
        <input value={search} onChange={e => setSearch(e.target.value)}
          placeholder="Search by name or email..."
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 flex-1 max-w-xs" />
        <select value={filter} onChange={e => setFilter(e.target.value)}
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
          {['All','Active','Pending','Suspended'].map(s => <option key={s}>{s}</option>)}
        </select>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50">
              {['Name','Plan','Status','Requests','Joined','Actions'].map(h => (
                <th key={h} className="text-left text-xs font-medium text-gray-500 px-4 py-3">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map(u => (
              <tr key={u.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3">
                  <p className="font-medium text-gray-800">{u.name}</p>
                  <p className="text-xs text-gray-400">{u.email}</p>
                </td>
                <td className="px-4 py-3 text-gray-600">{u.plan}</td>
                <td className="px-4 py-3">
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${STATUS_STYLE[u.status]}`}>{u.status}</span>
                </td>
                <td className="px-4 py-3 text-gray-600">{u.requests.toLocaleString()}</td>
                <td className="px-4 py-3 text-gray-400 text-xs">{u.joined}</td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    {u.status === 'Pending'   && <button className="text-xs text-green-600 hover:underline">Approve</button>}
                    {u.status === 'Active'    && <button className="text-xs text-red-500 hover:underline">Suspend</button>}
                    {u.status === 'Suspended' && <button className="text-xs text-blue-600 hover:underline">Restore</button>}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && <p className="text-center text-sm text-gray-400 py-8">No users found</p>}
      </div>
    </div>
  )
}