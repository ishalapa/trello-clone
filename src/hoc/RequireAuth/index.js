import React from 'react'
import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { currentUserStateEmail } from 'store/slices/usersSlice'

const RequireAuth = ({ children }) => {
  const userEmail = useSelector(currentUserStateEmail)
    console.log(userEmail)
  if (userEmail) {
    <Navigate to="auth/" />
    return children
  } else {
    return <Navigate to="/" />
  }
}

export default RequireAuth
