import React from 'react'

import styles from 'assets/scss/SignUp.module.scss'
import SignUpForm from 'components/SignUpForm'

import { Box, Typography } from '@mui/material'
import { CgTrello } from 'react-icons/cg'

const SignUp = () => {
  return (
    <div className={styles.main}>
      <Box width="100%" display="flex" flexDirection="column" alignItems="center">
        <Box pt={5} pb={4} display="flex" alignItems="center">
          <CgTrello size={40} color="#0073e6" />
          <Typography pl={1} fontWeight="600" variant="h3">Trello</Typography>
        </Box>

        <SignUpForm />
      </Box>
    </div>
  )
}

export default SignUp
