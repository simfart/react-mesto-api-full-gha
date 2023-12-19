import React from 'react'
import { Navigate } from 'react-router-dom'
import { useUserStore } from '../store'

function ProtectedRoute({ element }) {
  const { isLoggedIn } = useUserStore()

  return isLoggedIn ? element : <Navigate to="/singin" replace />
}

export default ProtectedRoute
