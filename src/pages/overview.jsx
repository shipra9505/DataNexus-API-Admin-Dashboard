import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

const requestData = [
  {day:'Mon',requests:12400},{day:'Tue',requests:18900},{day:'Wed',requests:15600},
  {day:'Thu',requests:22100},{day:'Fri',requests:19800},{day:'Sat',requests:8900},{day:'Sun',requests:6200},
]
const planData = [
  { name:'Free', value:340 },{ name:'Premium', value:89 },
  { name:'Pro', value:34 },{ name:'Unlimited', value:8 },
]
const COLORS = ['#93c5fd','#60a5fa','#3b82f6','#1d4ed8']

const topStates = [
  {state:'Maharashtra',villages:44198},{state:'Uttar Pradesh',villages:97941},
  {state:'Madhya Pradesh',villages:55393},{state:'Rajasthan',villages:44794},
  {state:'Karnataka',villages:29736},
]

export default function Overview() {
  return (
    <div className="p-8 space-y-6">
      <h1 className="text-lg font-semibold text-gray-900">Overview</h1>

      {/* KPI cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total villages',    value: '6,40,867', sub: 'across all states' },
          { label: 'Active users',      value: '471',      sub: '+12 today' },
          { label: "Today's requests",  value: '1,04,200', sub: '96% success rate' },
          { label: 'Avg response time', value: '38ms',     sub: 'SLA: <100ms' },
        ].map(({ label, value, sub }) => (
          <div key={label} className="bg-white rounded-xl border border-gray-200 p-5">
            <p className="text-xs text-gray-500 mb-1">{label}</p>
            <p className="text-2xl font-semibold text-gray-900">{value}</p>
            <p className="text-xs text-gray-400 mt-1">{sub}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Requests chart */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-sm font-semibold text-gray-800 mb-4">API requests — last 7 days</h2>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={requestData}>
              <XAxis dataKey="day" tick={{fontSize:12}} axisLine={false} tickLine={false}/>
              <YAxis tick={{fontSize:12}} axisLine={false} tickLine={false}/>
              <Tooltip/>
              <Line type="monotone" dataKey="requests" stroke="#3b82f6" strokeWidth={2} dot={false}/>
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Plan distribution */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-sm font-semibold text-gray-800 mb-4">Users by plan</h2>
          <ResponsiveContainer width="100%" height={160}>
            <PieChart>
              <Pie data={planData} cx="50%" cy="50%" innerRadius={40} outerRadius={70} dataKey="value">
                {planData.map((_, i) => <Cell key={i} fill={COLORS[i]}/>)}
              </Pie>
              <Tooltip/>
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-1 mt-2">
            {planData.map((p,i) => (
              <div key={p.name} className="flex justify-between text-xs">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full inline-block" style={{background: COLORS[i]}}></span>
                  {p.name}
                </span>
                <span className="text-gray-500">{p.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top states table */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-sm font-semibold text-gray-800 mb-4">Top states by village count</h2>
        <div className="space-y-3">
          {topStates.map(s => (
            <div key={s.state} className="flex items-center gap-4">
              <span className="text-sm text-gray-700 w-40 shrink-0">{s.state}</span>
              <div className="flex-1 bg-gray-100 rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{width: `${(s.villages/97941)*100}%`}}></div>
              </div>
              <span className="text-xs text-gray-500 w-16 text-right">{s.villages.toLocaleString()}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}