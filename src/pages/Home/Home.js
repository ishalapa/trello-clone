import React from 'react'

import 'assets/scss/Home.scss'
import Dashboards from 'components/Dashboards'
import { Stack, Box, Typography } from '@mui/material'
import { Container } from '@mui/system'

import {CgTrello} from "react-icons/cg"

const Home = () => {
  return (
    <Container maxWidth="lg">
      <Box pt="30px">
        <Box width="220px" display="flex" justifyContent="space-between" alignItems="center" pb="15px">
          <CgTrello size={40} color='#0073e6'/>
          <Typography variant="h5">Trello Workspace</Typography>
        </Box>
        <Stack spacing={2} direction="row">
          <Dashboards />
        </Stack>
      </Box>
    </Container>
  )
}

export default Home
