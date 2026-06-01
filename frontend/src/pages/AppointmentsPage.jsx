import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import AdminLayout from '../components/admin/AdminLayout'
import DataTableToolbar from '../components/admin/DataTableToolbar'
import api, { downloadFile } from '../lib/api'

function AppointmentsPage() {
  const [items, setItems] = useState([])
  const [search, setSearch] = useState('')
  const [date, setDate] = useState('')
  const [status, setStatus] = useState('')

  const load = async () => {
    const { data } = await api.get('/admin/appointments', { params: { search, date, status } })
    setItems(data.appointments)
  }

  useEffect(() => {
    api
      .get('/admin/appointments', { params: { search, date, status } })
      .then(({ data }) => {
        setItems(data.appointments)
      })
  }, [search, date, status])

  const updateStatus = async (id, nextStatus) => {
    await api.put(`/admin/appointments/${id}/status`, { status: nextStatus })
    toast.success('Appointment status updated.')
    load()
  }

  const removeItem = async (id) => {
    await api.delete(`/admin/appointments/${id}`)
    toast.success('Appointment deleted.')
    load()
  }

  return (
    <AdminLayout
      title="Appointment Requests"
      description="Track appointment demand, update statuses, and export filtered records."
      actions={
        <button
          type="button"
          onClick={() => downloadFile('/exports/appointments', 'appointment-requests.xlsx', { search, date, status })}
          className="w-full rounded-full bg-amber-400 px-5 py-3 text-sm font-semibold text-slate-950 sm:w-auto"
        >
          Export Appointments
        </button>
      }
    >
      <DataTableToolbar
        search={search}
        onSearchChange={setSearch}
        searchPlaceholder="Search by name, email, phone"
        filters={
          <>
            <input type="date" value={date} onChange={(event) => setDate(event.target.value)} className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm" />
            <select value={status} onChange={(event) => setStatus(event.target.value)} className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm">
              <option value="">All Statuses</option>
              <option value="Pending">Pending</option>
              <option value="Contacted">Contacted</option>
              <option value="Completed">Completed</option>
            </select>
          </>
        }
      />

      <div className="grid gap-4 lg:hidden">
        {items.map((item) => (
          <article key={item._id} className="rounded-[2rem] border border-white/10 bg-slate-950/70 p-5">
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <h2 className="font-display text-xl text-white">{item.name}</h2>
                <p className="mt-1 text-sm text-slate-400">
                  {item.appointmentDate} | {item.appointmentTime}
                </p>
              </div>
              <select value={item.status} onChange={(event) => updateStatus(item._id, event.target.value)} className="rounded-full border border-white/10 bg-slate-900 px-3 py-2 text-sm">
                <option value="Pending">Pending</option>
                <option value="Contacted">Contacted</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
            <div className="mt-4 space-y-3 text-sm">
              <div>
                <p className="text-slate-500">Phone</p>
                <p className="text-slate-200">{item.phone}</p>
              </div>
              <div>
                <p className="text-slate-500">Email</p>
                <p className="break-all text-slate-200">{item.email}</p>
              </div>
              <div>
                <p className="text-slate-500">Message</p>
                <p className="text-slate-300">{item.message}</p>
              </div>
            </div>
            <button type="button" onClick={() => removeItem(item._id)} className="mt-5 w-full rounded-full border border-rose-400/40 px-4 py-3 text-rose-300">
              Delete
            </button>
          </article>
        ))}
      </div>

      <div className="hidden overflow-x-auto rounded-[2rem] border border-white/10 lg:block">
        <table className="min-w-full bg-slate-950/70 text-left text-sm">
          <thead className="bg-white/10 text-slate-300">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Date & Time</th>
              <th className="px-4 py-3">Contact</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Message</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item._id} className="border-t border-white/10">
                <td className="px-4 py-4">{item.name}</td>
                <td className="px-4 py-4">{item.appointmentDate} | {item.appointmentTime}</td>
                <td className="px-4 py-4">{item.phone}<br />{item.email}</td>
                <td className="px-4 py-4">
                  <select value={item.status} onChange={(event) => updateStatus(item._id, event.target.value)} className="rounded-full border border-white/10 bg-slate-900 px-3 py-2">
                    <option value="Pending">Pending</option>
                    <option value="Contacted">Contacted</option>
                    <option value="Completed">Completed</option>
                  </select>
                </td>
                <td className="px-4 py-4 text-slate-300">{item.message}</td>
                <td className="px-4 py-4">
                  <button type="button" onClick={() => removeItem(item._id)} className="rounded-full border border-rose-400/40 px-4 py-2 text-rose-300">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  )
}

export default AppointmentsPage
