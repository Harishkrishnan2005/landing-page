function MetricCard({ label, value, accent = 'amber' }) {
  const accentMap = {
    amber: 'from-amber-400/25 to-amber-200/5 text-amber-200',
    emerald: 'from-emerald-400/25 to-emerald-200/5 text-emerald-200',
    sky: 'from-sky-400/25 to-sky-200/5 text-sky-200',
    rose: 'from-rose-400/25 to-rose-200/5 text-rose-200',
  }

  return (
    <div className={`rounded-[2rem] border border-white/10 bg-gradient-to-br p-6 ${accentMap[accent]}`}>
      <p className="text-xs uppercase tracking-[0.22em] text-slate-300 sm:text-sm">{label}</p>
      <p className="mt-4 font-display text-3xl text-white sm:text-4xl">{value}</p>
    </div>
  )
}

export default MetricCard
