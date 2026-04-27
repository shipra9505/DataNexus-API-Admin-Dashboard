import { useState } from 'react'

const LOGS = [
  { id:1, time:'10:42:01', user:'rahul@flipkart.com', endpoint:'/api/v1/search',       status:200, ms:34  },
  { id:2, time:'10:41:58', user:'priya@swiggy.in',    endpoint:'/api/v1/states',        status:200, ms:12  },
  { id:3, time:'10:41:45', user:'sneha@logistic.co',  endpoint:'/api/v1/villages',      status:200, ms:58  },
  { id:4, time:'10:41:33', user:'unknown',             endpoint:'/api/v1/search',        status:401, ms:5   },
  { id:5, time:'10:41:20', user:'rahul@flipkart.com', endpoint:'/api/v1/autocomplete',  status:200, ms:28  },
  { id:6, time:'10:40:59', user:'rohan@ecom.in',      endpoint:'/api/v1/districts',     status:429, ms:3   },
]

const STATUS_COLOR = { 200:'text-green-600', 401:'text-red-500', 429:'text-yellow-600', 500:'text-red-600' }

export default function Logs() {
  const [filter, setFilter] = useState('All')

  const filtered = LOGS.filter(l => filter === 'All' || String(l.status).startsWith(filter[0]))

  return (
    <div className="p-8 space-y-4">
      <h1 className="text-lg font-semibold text-gray-900">API logs</h1>

      <div className="flex gap-2">
        {['All','2xx','4xx','5xx'].map(f => (
          <button key={f} onClick={() => setFilter(f)}
            className={`text-xs px-3 py-1.5 rounded-lg border transition-colors ${filter === f ? 'bg-blue-600 text-white border-blue-600' : 'border-gray-200 text-gray-600 hover:bg-gray-50'}`}>
            {f}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50">
              {['Time','User','Endpoint','Status','Response time'].map(h => (
                <th key={h} className="text-left text-xs font-medium text-gray-500 px-4 py-3">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map(l => (
              <tr key={l.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3 text-xs font-mono text-gray-500">{l.time}</td>
                <td className="px-4 py-3 text-xs text-gray-600">{l.user}</td>
                <td className="px-4 py-3 font-mono text-xs text-gray-700">{l.endpoint}</td>
                <td className={`px-4 py-3 text-xs font-semibold ${STATUS_COLOR[l.status]}`}>{l.status}</td>
                <td className="px-4 py-3 text-xs text-gray-500">{l.ms}ms</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}