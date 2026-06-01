import { motion } from 'framer-motion'

function LoadingScreen({
  message = 'Preparing experience...',
  detail = '',
  showLogo = false,
}) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4 text-white">
      <div className="text-center">
        {showLogo ? (
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-[1.5rem] bg-amber-400 font-display text-2xl text-slate-950">
            VW
          </div>
        ) : null}
        <motion.div
          className="mx-auto h-16 w-16 rounded-full border-4 border-white/10 border-t-amber-400"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1.2, ease: 'linear' }}
        />
        <p className="mt-5 text-sm tracking-[0.3em] uppercase text-slate-300">
          {message}
        </p>
        {detail ? <p className="mt-3 max-w-sm text-sm text-slate-400">{detail}</p> : null}
      </div>
    </div>
  )
}

export default LoadingScreen
