import React, { useState } from 'react'
import { useSelector } from 'react-redux'

import { Container, Box, Stack, Button, TextField } from '@mui/material'
import BoardCards from 'components/BoardCards'
import CustomSelect from 'components/CustomSelect'
import { currentDashboardState } from 'store/slices/currentDashboardSlice'

// TODO change BoardCards to DashboardColumn

const DashboardPage = () => {
  const currentDashboard = useSelector(currentDashboardState)
  const [isBtnClicked, setIsBtnClicked] = useState(false)
  // TODO change to taskName/ setTaskName
  const [inp, setInp] = useState('')
  return (
    <Container maxWidth="lg">
      <Stack direction="row" spacing={2} pt={2}>
        <CustomSelect />
        {!isBtnClicked ? (
          <Button
            onClick={() => setIsBtnClicked(true)}
            variant="outlined"
            sx={{ justifyContent: 'flex-start', '&:hover': { backgroundColor: '#e6e6e6' } }}
          >
            {currentDashboard && currentDashboard.title}
          </Button>
        ) : (
          <TextField
            value={inp}
            onChange={(e) => setInp(e.target.value)}
            sx={{ backgroundColor: 'white' }}
            size="small"
            variant="outlined"
            placeholder="Enter a title for this card"
          />
        )}
      </Stack>
      <Box pt={3}>
        <BoardCards />
      </Box>
    </Container>
  )
}

export default DashboardPage
