import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import LoadingScreen from '../shared/LoadingScreen'

function ProtectedRoute({ children }) {
  const { admin, authLoading } = useAuth()
  const location = useLocation()

  if (authLoading) {
    return <LoadingScreen message="Verifying secure admin session..." />
  }

  if (!admin) {
    return <Navigate to="/admin/login" replace state={{ from: location }} />
  }

  return children
}

export default ProtectedRoute
