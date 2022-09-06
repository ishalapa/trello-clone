import React from 'react'
import { useSelector } from 'react-redux'
import { currentUserStateEmail } from 'store/slices/usersSlice'

const NotFound = () => {
    const userEmail = useSelector(currentUserStateEmail)

  return (
    <div>NotFound</div>
  )
}

export default NotFound