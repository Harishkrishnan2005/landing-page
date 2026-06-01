import { useState } from 'react'
import { toast } from 'react-toastify'
import AdminLayout from '../components/admin/AdminLayout'
import { useAuth } from '../hooks/useAuth'

function ProfilePage() {
  const { admin, updatePassword } = useAuth()
  const [form, setForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  })

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (form.newPassword !== form.confirmPassword) {
      toast.error('New passwords do not match.')
      return
    }

    try {
      await updatePassword(form)
      toast.success('Password updated successfully.')
      setForm({ currentPassword: '', newPassword: '', confirmPassword: '' })
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <AdminLayout title="Admin Profile" description="Manage your secure login credentials and keep the dashboard access protected.">
      <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="rounded-[2rem] border border-white/10 bg-white/5 p-5 sm:p-6">
          <p className="text-sm uppercase tracking-[0.25em] text-amber-300">Account</p>
          <h2 className="mt-3 break-all font-display text-2xl text-white sm:text-3xl">{admin?.email}</h2>
          <p className="mt-3 text-slate-300">Protected with JWT cookie authentication, bcrypt password hashing, strict validation, and secure session controls.</p>
        </div>

        <form onSubmit={handleSubmit} className="grid gap-4 rounded-[2rem] border border-white/10 bg-slate-950/70 p-5 sm:p-6">
          <input type="password" placeholder="Current Password" value={form.currentPassword} onChange={(event) => setForm((prev) => ({ ...prev, currentPassword: event.target.value }))} className="input-field-dark" />
          <input type="password" placeholder="New Password" value={form.newPassword} onChange={(event) => setForm((prev) => ({ ...prev, newPassword: event.target.value }))} className="input-field-dark" />
          <input type="password" placeholder="Confirm New Password" value={form.confirmPassword} onChange={(event) => setForm((prev) => ({ ...prev, confirmPassword: event.target.value }))} className="input-field-dark" />
          <button type="submit" className="w-full rounded-full bg-amber-400 px-6 py-4 font-semibold text-slate-950 sm:w-auto">
            Update Password
          </button>
        </form>
      </div>
    </AdminLayout>
  )
}

export default ProfilePage
