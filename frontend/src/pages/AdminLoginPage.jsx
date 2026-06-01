import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { LockKeyhole, Mail } from 'lucide-react'
import { useAuth } from '../hooks/useAuth'
import { useBackendStatus } from '../hooks/useBackendStatus'

function AdminLoginPage() {
  const { login } = useAuth()
  const { backendReady, checkingBackend } = useBackendStatus()
  const navigate = useNavigate()
  const location = useLocation()
  const [form, setForm] = useState({ email: '', password: '' })
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!backendReady) {
      toast.info('Server is still starting. Please wait a moment before signing in.')
      return
    }

    try {
      setSubmitting(true)
      await login(form)
      toast.success('Welcome back.')
      navigate(location.state?.from?.pathname || '/admin/dashboard', { replace: true })
    } catch (error) {
      toast.error(error.message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4">
      <form onSubmit={handleSubmit} className="w-full max-w-md rounded-[2rem] border border-white/10 bg-white/5 p-8 text-white backdrop-blur">
        <p className="text-sm uppercase tracking-[0.35em] text-amber-300">Hidden Admin Route</p>
        <h1 className="mt-4 font-display text-4xl">Secure Login</h1>
        <p className="mt-3 text-slate-300">Cookie-based authentication with JWT verification on every protected request.</p>

        <label className="mt-8 block">
          <span className="mb-2 flex items-center gap-2 text-sm text-slate-300"><Mail size={16} /> Email</span>
          <input className="input-field-dark" name="email" value={form.email} onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))} />
        </label>

        <label className="mt-4 block">
          <span className="mb-2 flex items-center gap-2 text-sm text-slate-300"><LockKeyhole size={16} /> Password</span>
          <input type="password" className="input-field-dark" name="password" value={form.password} onChange={(event) => setForm((prev) => ({ ...prev, password: event.target.value }))} />
        </label>

        <button type="submit" disabled={submitting || checkingBackend || !backendReady} className="mt-6 w-full rounded-full bg-amber-400 px-6 py-4 font-semibold text-slate-950 transition hover:bg-amber-300 disabled:cursor-not-allowed disabled:opacity-60">
          {submitting || checkingBackend ? 'Signing in...' : 'Login'}
        </button>
      </form>
    </div>
  )
}

export default AdminLoginPage
