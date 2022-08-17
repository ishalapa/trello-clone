import React, { useState } from 'react'
import { useSelector } from 'react-redux'

import { Container, Box, Stack, Button, TextField } from '@mui/material'
import CustomSelect from 'components/CustomSelect'
import { currentDashboardState } from 'store/slices/currentDashboardSlice'
import BoardCard from 'components/BoardCard'
import AddNewListBtn from 'components/AddNewListBtn'
import { boardCardsState } from 'store/slices/boardCardsSlice'

const DashboardPage = () => {
  const currentDashboard = useSelector(currentDashboardState)
  const cards = useSelector(boardCardsState)
  const [isBtnClicked, setIsBtnClicked] = useState(false)
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
        <Stack spacing={2} direction="row">
          {cards && cards.map((card) => <BoardCard key={card.id} card={card} />)}
          <AddNewListBtn />
        </Stack>
      </Box>
    </Container>
  )
}

export default DashboardPage
