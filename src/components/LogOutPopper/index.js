import React, { useState, useEffect } from 'react'

import { Box, Popper, Fade, Paper, Typography, Divider, Button } from '@mui/material'
import { useSelector } from 'react-redux'
import {
  currentUserStateEmail,
  currentUserStateName,
  setCurrentUserEmail,
  setCurrentUserId,
  setCurrentUserName,
} from 'store/slices/usersSlice'

import { signOut } from 'firebase/auth'
import { auth } from 'firebase-client'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import UserCircle from 'ui/UserCircle'

const LogOutPopper = () => {
  const userName = useSelector(currentUserStateName)
  const userEmail = useSelector(currentUserStateEmail)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [iconName, setIconName] = useState('')
  useEffect(() => {
    if (userName) {
      setIconName(userName.split(' ')[0].slice(0, 1) + userName.split(' ')[1].slice(0, 1))
    } else setIconName('')
  }, [userName])

  const [anchorEl, setAnchorEl] = useState(null)
  const [open, setOpen] = useState(false)
  const [placement, setPlacement] = useState()

  const handleClick = (newPlacement) => (event) => {
    setAnchorEl(event.currentTarget)
    setOpen((prev) => placement !== newPlacement || !prev)
    setPlacement(newPlacement)
  }

  const logOut = () => {
    signOut(auth)
      .then(() => {
        dispatch(setCurrentUserId(null))
        dispatch(setCurrentUserEmail(''))
        dispatch(setCurrentUserName(''))
        setIconName('Name Name')
      })
      .then(() => {
        navigate('/signin')
      })
  }

  // const handleClick = () => null
  return (
    <>
      <UserCircle handleClick={handleClick} size={45} />
      <Popper
        sx={{ paddingTop: '10px', width: 300, zIndex: '100' }}
        open={open}
        anchorEl={anchorEl}
        placement={placement}
        transition
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Paper>
              <Typography fontSize={14} textAlign="center" variant="subtitle2" sx={{ p: 1 }}>
                Accaunt
              </Typography>
              <Divider />
              <Box p={1} display="flex" justifyContent="space-between">
                <UserCircle handleClick={handleClick} size={45} />
                <Box width="75%" display="flex" flexDirection="column" justifyContent="center">
                  <Typography variant="h6">{userName}</Typography>
                  <Typography variant="body2">{userEmail}</Typography>
                </Box>
              </Box>
              <Divider />
              <Button onClick={logOut} fullWidth variant="text">
                Log Out
              </Button>
            </Paper>
          </Fade>
        )}
      </Popper>
    </>
  )
}

export default LogOutPopper
