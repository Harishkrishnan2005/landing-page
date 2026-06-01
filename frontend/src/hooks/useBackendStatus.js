import { useContext } from 'react'
import BackendStatusContext from '../context/BackendStatusContext'

export const useBackendStatus = () => useContext(BackendStatusContext)
