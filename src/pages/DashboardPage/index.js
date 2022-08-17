import React, { useState } from 'react'
import { useSelector } from 'react-redux'

import { Container, Box, Stack, Button, TextField } from '@mui/material'
import { useNavigate} from "react-router-dom"
import CustomSelect from 'components/CustomSelect'
import { currentDashboardState } from 'store/slices/dashboardsSlice'
import BoardCard from 'components/BoardCard'
import AddNewListBtn from 'components/AddNewListBtn'
import { boardCardsState } from 'store/slices/dashboardsSlice'
import {MdOutlineArrowBackIos} from "react-icons/md"

const DashboardPage = () => {
  const navigate = useNavigate()
  const currentDashboard = useSelector(currentDashboardState)
  const cards = useSelector(boardCardsState)
  
  const [isDashboardTitleEditOpen, setIsDashboardTitleEditOpen] = useState(false)
  const [dashboardTitle, setDashboardTitle] = useState('')
  return (
    <Container maxWidth="lg">
      <Stack direction="row" spacing={2} pt={2}>
        <Button onClick={() => navigate("/home")} startIcon={<MdOutlineArrowBackIos/>} variant='contained'>
          Back
        </Button>
        <CustomSelect />
        {!isDashboardTitleEditOpen ? (
          <Button
            onClick={() => setIsDashboardTitleEditOpen(true)}
            variant="outlined"
            sx={{ justifyContent: 'flex-start', '&:hover': { backgroundColor: '#e6e6e6' } }}
          >
            {currentDashboard && currentDashboard.title}
          </Button>
        ) : (
          <TextField
            value={dashboardTitle}
            onChange={(e) => setDashboardTitle(e.target.value)}
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
