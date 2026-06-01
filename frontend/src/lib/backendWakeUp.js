import axios from 'axios'

const DEFAULT_API_URL = 'http://localhost:5000/api'
const configuredApiUrl = import.meta.env.VITE_API_URL || DEFAULT_API_URL

export const backendBaseUrl = configuredApiUrl.replace(/\/api\/?$/, '')
export const backendHealthUrl = `${backendBaseUrl}/health`

export const wakeUpBackend = async (options = {}) => {
  // Use a lightweight request so the UI can warm Render before protected or form requests fire.
  const response = await axios.get(backendHealthUrl, {
    timeout: 15000,
    signal: options.signal,
    withCredentials: false,
  })

  return response.data
}
