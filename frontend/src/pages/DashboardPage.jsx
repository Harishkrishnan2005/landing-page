import { useEffect, useState } from 'react'
import AdminLayout from '../components/admin/AdminLayout'
import MetricCard from '../components/admin/MetricCard'
import api from '../lib/api'

function DashboardPage() {
  const [analytics, setAnalytics] = useState(null)

  useEffect(() => {
    api.get('/admin/dashboard').then(({ data }) => setAnalytics(data))
  }, [])

  return (
    <AdminLayout title="Overview" description="Live insight into contact requests, appointment demand, and recent activity across your landing page.">
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard label="Total Contact Requests" value={analytics?.totals.contacts ?? 0} />
        <MetricCard label="Total Appointment Requests" value={analytics?.totals.appointments ?? 0} accent="sky" />
        <MetricCard label="Today's Requests" value={analytics?.totals.today ?? 0} accent="emerald" />
        <MetricCard label="Monthly Requests" value={analytics?.totals.month ?? 0} accent="rose" />
      </div>

      <section className="rounded-[2rem] border border-white/10 bg-white/5 p-5 backdrop-blur sm:p-6">
        <h2 className="font-display text-xl text-white sm:text-2xl">Recent Activities</h2>
        <div className="mt-4 space-y-4">
          {(analytics?.recentActivity ?? []).map((item) => (
            <div key={item.id} className="rounded-2xl border border-white/10 bg-slate-950/60 p-4">
              <p className="font-medium text-white">{item.title}</p>
              <p className="mt-1 text-sm text-slate-400">{item.subtitle}</p>
            </div>
          ))}
        </div>
      </section>
    </AdminLayout>
  )
}

export default DashboardPage
