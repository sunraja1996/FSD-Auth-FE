import React from 'react'
import { Navigate } from 'react-router-dom'

function ProdectedRoute({children }) {

  return (
    sessionStorage.getItem('token') === null?  <Navigate to='/login' /> :children
  )
}

export default ProdectedRoute 