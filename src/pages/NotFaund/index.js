import React from 'react'
import { useSelector } from 'react-redux'
import { currentUserStateEmail } from 'store/slices/usersSlice'

const NotFaund = () => {
    const userEmail = useSelector(currentUserStateEmail)
    console.log(userEmail)
  return (
    <div>NotFaund</div>
  )
}

export default NotFaund