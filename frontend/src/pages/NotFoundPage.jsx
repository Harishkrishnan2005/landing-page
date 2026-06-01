import { Link } from 'react-router-dom'

function NotFoundPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4 text-center text-white">
      <div>
        <p className="text-sm uppercase tracking-[0.35em] text-amber-300">404</p>
        <h1 className="mt-4 font-display text-5xl">Page not found</h1>
        <p className="mt-4 text-slate-300">The page you requested does not exist.</p>
        <Link to="/" className="mt-6 inline-flex rounded-full bg-amber-400 px-6 py-4 font-semibold text-slate-950">
          Return Home
        </Link>
      </div>
    </div>
  )
}

export default NotFoundPage
