import { createContext, useCallback, useMemo, useState } from 'react'
import { toast } from 'react-toastify'
import LoadingScreen from '../components/shared/LoadingScreen'
import { useBackendWakeUp } from '../hooks/useBackendWakeUp'
import { wakeUpBackend } from '../lib/backendWakeUp'

const BackendStatusContext = createContext(null)

const STARTING_TOAST_ID = 'backend-starting'
const READY_TOAST_ID = 'backend-ready'

const getReadableError = (error) => {
  if (error.code === 'ECONNABORTED') {
    return 'The server is taking longer than expected to start.'
  }

  if (!error.response) {
    return 'The backend is waking up. Retrying automatically...'
  }

  return error.response?.data?.message || 'Backend is still starting.'
}

export function BackendStatusProvider({ children }) {
  const [backendReady, setBackendReady] = useState(false)
  const [checkingBackend, setCheckingBackend] = useState(true)

  const checkBackend = useCallback(async (signal) => {
    try {
      // Cold starts on Render are handled here before the rest of the app begins firing API calls.
      await wakeUpBackend({ signal })
      setBackendReady(true)
      setCheckingBackend(false)
      toast.dismiss(STARTING_TOAST_ID)
      if (!toast.isActive(READY_TOAST_ID)) {
        toast.success('Server ready. You can continue now.', { toastId: READY_TOAST_ID })
      }
      return false
    } catch (error) {
      if (error.name === 'CanceledError' || error.code === 'ERR_CANCELED') {
        return false
      }

      setBackendReady(false)
      setCheckingBackend(true)
      if (!toast.isActive(STARTING_TOAST_ID)) {
        toast.info('Starting server, please wait...', {
          toastId: STARTING_TOAST_ID,
          autoClose: false,
        })
      } else {
        toast.update(STARTING_TOAST_ID, {
          render: getReadableError(error),
          type: toast.TYPE.INFO,
          autoClose: false,
        })
      }
      return true
    }
  }, [])

  // Retry the health check every few seconds until Render has fully started the API server.
  useBackendWakeUp(checkBackend)

  const value = useMemo(
    () => ({
      backendReady,
      checkingBackend,
    }),
    [backendReady, checkingBackend],
  )

  if (checkingBackend && !backendReady) {
    return (
      <BackendStatusContext.Provider value={value}>
        <LoadingScreen
          message="Starting server, please wait..."
          detail="This may take up to 60 seconds on the first visit."
          showLogo
        />
      </BackendStatusContext.Provider>
    )
  }

  return <BackendStatusContext.Provider value={value}>{children}</BackendStatusContext.Provider>
}

export default BackendStatusContext
