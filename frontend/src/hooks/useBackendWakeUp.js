import { useEffect, useRef } from 'react'

const RETRY_DELAY_MS = 5000

export const useBackendWakeUp = (checkBackend) => {
  const retryTimeoutRef = useRef(null)

  useEffect(() => {
    let mounted = true
    let activeController = null

    const runCheck = async () => {
      activeController = new AbortController()
      const shouldRetry = await checkBackend(activeController.signal)

      // Keep retrying on cold starts, but stop cleanly on unmount to avoid memory leaks.
      if (mounted && shouldRetry) {
        retryTimeoutRef.current = window.setTimeout(runCheck, RETRY_DELAY_MS)
      }
    }

    runCheck()

    return () => {
      mounted = false
      activeController?.abort()
      if (retryTimeoutRef.current) {
        window.clearTimeout(retryTimeoutRef.current)
      }
    }
  }, [checkBackend])
}
