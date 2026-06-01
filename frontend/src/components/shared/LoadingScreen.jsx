import { motion } from 'framer-motion'

function LoadingScreen({ message = 'Preparing experience...' }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 text-white">
      <div className="text-center">
        <motion.div
          className="mx-auto h-16 w-16 rounded-full border-4 border-white/10 border-t-amber-400"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1.2, ease: 'linear' }}
        />
        <p className="mt-5 text-sm tracking-[0.3em] uppercase text-slate-300">
          {message}
        </p>
      </div>
    </div>
  )
}

export default LoadingScreen
