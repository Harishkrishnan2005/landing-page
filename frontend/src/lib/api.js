import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  withCredentials: true,
  timeout: 90000,
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    let message = error.response?.data?.message || error.message || 'Something went wrong.'

    if (error.code === 'ECONNABORTED') {
      message = 'The server took too long to respond. Please try again in a moment.'
    } else if (!error.response) {
      message =
        'Unable to reach the server right now. It may still be starting or temporarily unavailable.'
    }

    return Promise.reject(new Error(message))
  },
)

export const downloadFile = async (url, fileName, params = {}) => {
  const response = await api.get(url, {
    params,
    responseType: 'blob',
  })

  const blobUrl = URL.createObjectURL(new Blob([response.data]))
  const link = document.createElement('a')
  link.href = blobUrl
  link.download = fileName
  document.body.appendChild(link)
  link.click()
  link.remove()
  URL.revokeObjectURL(blobUrl)
}

export default api
