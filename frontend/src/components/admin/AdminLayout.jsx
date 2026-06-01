import { BarChart3, CalendarCheck2, LogOut, Mail, Menu, ShieldCheck, X } from 'lucide-react'
import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useAuth } from '../../hooks/useAuth'

const links = [
  { to: '/admin/dashboard', label: 'Dashboard', icon: BarChart3 },
  { to: '/admin/contacts', label: 'Contacts', icon: Mail },
  { to: '/admin/appointments', label: 'Appointments', icon: CalendarCheck2 },
  { to: '/admin/profile', label: 'Profile', icon: ShieldCheck },
]

function AdminLayout({ title, description, actions, children }) {
  const { admin, logout } = useAuth()
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)

  const handleLogout = async () => {
    await logout()
    toast.success('Logged out successfully.')
    setMenuOpen(false)
    navigate('/admin/login')
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-5 sm:py-6">
        <div className="mb-4 flex items-center justify-between gap-4 rounded-[1.75rem] border border-white/10 bg-white/5 px-4 py-4 backdrop-blur lg:hidden">
          <Link to="/" className="inline-flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-amber-400 font-display text-lg text-slate-950 sm:h-12 sm:w-12 sm:text-xl">
              VW
            </div>
            <div>
              <p className="font-display text-base sm:text-lg">Vertex Wholesale</p>
              <p className="text-xs text-slate-400 sm:text-sm">Secure Admin Console</p>
            </div>
          </Link>
          <button
            type="button"
            onClick={() => setMenuOpen((previous) => !previous)}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-white"
            aria-label="Toggle admin navigation"
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
        <aside
          className={`rounded-[2rem] border border-white/10 bg-white/5 p-5 backdrop-blur sm:p-6 ${
            menuOpen ? 'block' : 'hidden lg:block'
          }`}
        >
          <div className="hidden lg:block">
            <Link to="/" className="inline-flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-400 font-display text-xl text-slate-950">
                VW
              </div>
              <div>
                <p className="font-display text-lg">Vertex Wholesale</p>
                <p className="text-sm text-slate-400">Secure Admin Console</p>
              </div>
            </Link>
          </div>

          <nav className="space-y-2 lg:mt-8">
            {links.map(({ to, label, icon: Icon }) => (
              <NavLink
                key={to}
                to={to}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-2xl px-4 py-3 transition ${
                    isActive
                      ? 'bg-amber-400 text-slate-950'
                      : 'text-slate-300 hover:bg-white/8 hover:text-white'
                  }`
                }
              >
                <Icon size={18} />
                {label}
              </NavLink>
            ))}
          </nav>

          <div className="mt-8 rounded-2xl border border-white/10 bg-slate-900/80 p-4">
            <p className="text-sm text-slate-400">Signed in as</p>
            <p className="mt-1 break-all font-medium">{admin?.email}</p>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl border border-white/10 px-4 py-3 text-slate-200 transition hover:bg-white/10"
          >
            <LogOut size={16} />
            Logout
          </button>
        </aside>

        <main className="min-w-0 space-y-6">
          <header className="rounded-[2rem] border border-white/10 bg-white/5 p-5 backdrop-blur sm:p-6">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.35em] text-amber-300">
                  Admin Dashboard
                </p>
                <h1 className="mt-2 font-display text-3xl text-white sm:text-4xl">{title}</h1>
                <p className="mt-3 max-w-2xl text-slate-300">{description}</p>
              </div>
              {actions ? <div className="w-full lg:w-auto">{actions}</div> : null}
            </div>
          </header>
          {children}
        </main>
        </div>
      </div>
    </div>
  )
}

export default AdminLayout
