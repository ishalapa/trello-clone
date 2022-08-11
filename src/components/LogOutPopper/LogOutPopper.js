import React, {useState, useEffect} from 'react'

import { Box, Popper, Fade, Paper, Typography, Divider, Button } from '@mui/material'
import { useSelector } from 'react-redux'
import { currentUserStateEmail, currentUserStateId, currentUserStateName, setCurrentUserEmail, setCurrentUserId, setCurrentUserName } from 'store/slices/currentUserSlice'

import { signOut } from 'firebase/auth'
import { auth } from 'firebase-client'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

const LogOutPopper = ({ open, anchorEl, placement }) => {
  const userName = useSelector(currentUserStateName)
  const userEmail = useSelector(currentUserStateEmail)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [iconName, setIconName] = useState("")
  useEffect(() => {
    if(userName) {
      setIconName(userName.split(' ')[0].slice(0, 1) + userName.split(' ')[1].slice(0, 1))
    } else setIconName("")
  }, [userName]);
  
  const logOut = () => {
    signOut(auth).then(() => {
      dispatch(setCurrentUserId(null))
      dispatch(setCurrentUserEmail(""))
      dispatch(setCurrentUserName(""))
      setIconName("Name Name")
    }).then(() => {
      navigate('/signup')
    })
  }
  
  
  return (
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
              <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                width={50}
                height={50}
                sx={{ backgroundColor: '#004285' }}
                borderRadius="50%"
              >
                <Typography color={'white'} fontSize={14} textAlign="center" variant="subtitle2" sx={{ p: 1 }}>
                {iconName ? iconName : "User"}
                </Typography>
              </Box>
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
  )
}

export default LogOutPopper
