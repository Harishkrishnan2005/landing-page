import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import AdminLayout from '../components/admin/AdminLayout'
import DataTableToolbar from '../components/admin/DataTableToolbar'
import { downloadFile } from '../lib/api'
import api from '../lib/api'

function ContactsPage() {
  const [items, setItems] = useState([])
  const [search, setSearch] = useState('')
  const [date, setDate] = useState('')

  const load = async () => {
    const { data } = await api.get('/admin/contacts', { params: { search, date } })
    setItems(data.contacts)
  }

  useEffect(() => {
    api.get('/admin/contacts', { params: { search, date } }).then(({ data }) => {
      setItems(data.contacts)
    })
  }, [search, date])

  const removeItem = async (id) => {
    await api.delete(`/admin/contacts/${id}`)
    toast.success('Contact request deleted.')
    load()
  }

  return (
    <AdminLayout
      title="Contact Requests"
      description="Search, review, and export inbound contact submissions."
      actions={
        <button
          type="button"
          onClick={() => downloadFile('/exports/contacts', 'contact-requests.xlsx', { search, date })}
          className="w-full rounded-full bg-amber-400 px-5 py-3 text-sm font-semibold text-slate-950 sm:w-auto"
        >
          Export Contacts
        </button>
      }
    >
      <DataTableToolbar
        search={search}
        onSearchChange={setSearch}
        searchPlaceholder="Search by name, email, phone"
        filters={<input type="date" value={date} onChange={(event) => setDate(event.target.value)} className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm" />}
      />

      <div className="grid gap-4 lg:hidden">
        {items.map((item) => (
          <article key={item._id} className="rounded-[2rem] border border-white/10 bg-slate-950/70 p-5">
            <h2 className="font-display text-xl text-white">{item.name}</h2>
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
              <div>
                <p className="text-slate-500">Date</p>
                <p className="text-slate-200">{new Date(item.createdAt).toLocaleString()}</p>
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
              <th className="px-4 py-3">Phone</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Message</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item._id} className="border-t border-white/10">
                <td className="px-4 py-4">{item.name}</td>
                <td className="px-4 py-4">{item.phone}</td>
                <td className="px-4 py-4">{item.email}</td>
                <td className="px-4 py-4 text-slate-300">{item.message}</td>
                <td className="px-4 py-4">{new Date(item.createdAt).toLocaleString()}</td>
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

export default ContactsPage
