import React, { useState } from 'react'
import { useSelector } from 'react-redux'

import { Container, Box, Stack, Typography, Button } from '@mui/material'
import BoardCards from 'components/BoardCards'
import CustomSelect from 'components/CustomSelect'
import { currentDashboardState } from 'store/slices/currentDashboardSlice'

const DashboardPage = () => {
  const currentDashboard = useSelector(currentDashboardState)
  const [isBtnClicked, setIsBtnClicked] = useState(false)
  return (
    <Container maxWidth="lg">
      <Stack direction="row" spacing={2} pt={2}>
        <CustomSelect />
        <Button
          onClick={() => setIsBtnClicked(true)}
          variant="outlined"
          sx={{ justifyContent: 'flex-start', '&:hover': { backgroundColor: '#e6e6e6' } }}
        >
          {currentDashboard && currentDashboard.title}
        </Button>
      </Stack>
      <Box pt={3}>
        <BoardCards />
      </Box>
    </Container>
  )
}

export default DashboardPage
