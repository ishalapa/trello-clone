import React, { useState } from 'react'

import { Card, CardContent, Typography, Box, TextField, Button, Alert } from '@mui/material'

import { FcGoogle } from 'react-icons/fc'
import { useSelector } from 'react-redux'
import { currentUserStateEmail, currentUserStateName, setCurrentUserEmail, setCurrentUserName } from 'store/slices/currentUserSlice'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { auth } from 'firebase-client'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

const SignUpForm = () => {
  const dispatch = useDispatch()
  const currentEmail = useSelector(currentUserStateEmail)
  const currentUser = useSelector(currentUserStateName)
  const [email, setEmail] = useState(currentEmail)
  const [showError, setShowError] = useState(false)
  const [error, setError] = useState('')
  let navigate = useNavigate()

  const regex = /^\S+@\S+\.\S+$/

  const handleSubmit = (e) => {
    if (!email.match(regex)) {
      return setShowError(true)
    } else setShowError(false)
  }
  const signInWithGoogle = () => {
    let googleProvider = new GoogleAuthProvider()

    signInWithPopup(auth, googleProvider)
      .then((result) => {
    
        const user = result.user
        
        dispatch(setCurrentUserName(user.displayName))
        dispatch(setCurrentUserEmail(user.email))
      })
      .then (() => {
        console.log(currentUser)
        console.log(currentEmail)
        navigate("/home")
      })
      .catch((error) => {

      })
  }
  return (
    <Box width="450px">
      <Card sx={{ display: 'flex', justifyContent: 'center' }}>
        <CardContent sx={{ width: '90%' }}>
          <Typography pb={2} fontWeight="600" textAlign="center" variant="h6" color="text.secondary">
            Sign up for your account
          </Typography>
          <TextField
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email adress"
            type="email"
            fullWidth
            size="small"
          />
          {showError && (
            <Alert sx={{ marginTop: '7px' }} severity="error">
              Enter valid Email
            </Alert>
          )}
          <Typography pt={1} pb={1} textAlign="center" variant="subtitle2" color="text.secondary">
            By signing up, I accept the Atlassian Cloud Terms of Service and acknowledge the Privacy Policy.
          </Typography>
          <Button onClick={(e) => handleSubmit(e)} variant="contained" fullWidth>
            Sign Up
          </Button>
          <Typography pt={1} pb={1} textAlign="center" variant="subtitle2">
            OR
          </Typography>
          <Card sx={{ height: '45px' }}>
            <Button onClick={signInWithGoogle} fullWidth startIcon={<FcGoogle />} sx={{ height: '100%' }}>
              <Typography textAlign="center">Continue with Google</Typography>
            </Button>
          </Card>
        </CardContent>
      </Card>
    </Box>
  )
}

export default SignUpForm
