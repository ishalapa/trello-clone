import React, { useState } from 'react'

import { Card, CardContent, Typography, Box, TextField, Button, Alert, Stack } from '@mui/material'

import { FcGoogle } from 'react-icons/fc'
import { useSelector } from 'react-redux'
import {
  currentUserStateEmail,
  setCurrentUserEmail,
  setCurrentUserName,
  usersState,
} from 'store/slices/usersSlice'
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from 'firebase/auth'
import { auth } from 'firebase-client'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { addDoc } from 'firebase/firestore'
import { usersCollection } from 'firebase-client'

const SignUpForm = () => {
  const dispatch = useDispatch()
  const currentEmail = useSelector(currentUserStateEmail)
  const userList = useSelector(usersState)

  const [email, setEmail] = useState(currentEmail)
  const [password, setPassword] = useState('')
  const [showError, setShowError] = useState(false)
  const [isSignUp, setIsSignUp] = useState(true)

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
      .then(() => {
        navigate('/home')
      })
      .catch((error) => {})
  }
  const signUpWithPass = (e) => {
    e.preventDefault()
    createUserWithEmailAndPassword(auth, email, password)
      .then( (result) => {
        const user = result.user
        addDoc(usersCollection, { name: user.email })
        
        dispatch(setCurrentUserName(user.displayName))
        dispatch(setCurrentUserEmail(user.email))
      })
      .then(() => {
        navigate('/home')
      })
  }
  const signInwithPass = async (e) => {
    e.preventDefault()
    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        const user = result.user
        dispatch(setCurrentUserName(user.displayName))
        dispatch(setCurrentUserEmail(user.email))
      })
      .then(() => {
          navigate('/home')
      })
  }

  return (
    <Box width="450px">
      <Card sx={{ display: 'flex', justifyContent: 'center' }}>
        <CardContent sx={{ width: '90%' }}>
          <Typography pb={2} fontWeight="600" textAlign="center" variant="h6" color="text.secondary">
            {isSignUp ? 'Sign up for your account' : 'Sign in for your account'}
          </Typography>
          <form action="" onSubmit={(e) => (isSignUp ? signUpWithPass(e) : signInwithPass(e))}>
            <Stack spacing={1}>
              <TextField
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email adress"
                type="email"
                fullWidth
                size="small"
              />
              {showError && <Alert severity="error">Enter valid Email</Alert>}
              <TextField
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Create password"
                type="password"
                fullWidth
                size="small"
              />
              {/* {isSignUp && (
                <TextField
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Confirm password"
                  type="password"
                  fullWidth
                  size="small"
                />
              )} */}
            </Stack>

            <Typography pt={1} pb={1} textAlign="center" variant="subtitle2" color="text.secondary">
              By signing up, I accept the Atlassian Cloud Terms of Service and acknowledge the Privacy Policy.
            </Typography>
            <Button type="sumbit" variant="contained" fullWidth>
              {isSignUp ? 'Sign Up' : 'Sign In'}
            </Button>
          </form>

          <Typography pt={1} pb={1} textAlign="center" variant="subtitle2">
            OR
          </Typography>
          <Card sx={{ height: '45px' }}>
            <Button onClick={signInWithGoogle} fullWidth startIcon={<FcGoogle />} sx={{ height: '100%' }}>
              <Typography textAlign="center">Continue with Google</Typography>
            </Button>
          </Card>
          {isSignUp ? (
            <Link to="/signin" onClick={() => setIsSignUp(false)}>
              <Typography pt={1} pb={1} textAlign="center" variant="subtitle2">
                Already have an accaunt? Click here to authorize
              </Typography>
            </Link>
          ) : (
            <Link to="/signup" onClick={() => setIsSignUp(true)}>
              <Typography pt={1} pb={1} textAlign="center" variant="subtitle2">
                Don't have an accaunt? Click here to sign up
              </Typography>
            </Link>
          )}
        </CardContent>
      </Card>
    </Box>
  )
}

export default SignUpForm
