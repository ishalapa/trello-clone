import React, { useState } from 'react'
import { useSelector } from 'react-redux'

import { Container, Box, Stack, Button, TextField } from '@mui/material'
import { useNavigate} from "react-router-dom"
import { currentDashboardState, setCurrentDashboard } from 'store/slices/dashboardsSlice'
import BoardCard from 'components/BoardCard'
import AddNewListBtn from 'components/AddNewListBtn'
import { boardCardsState } from 'store/slices/dashboardsSlice'
import {MdOutlineArrowBackIos} from "react-icons/md"
import { doc, updateDoc } from 'firebase/firestore'
import { useDispatch } from 'react-redux'
import { generalBoardCollection } from 'firebase-client'
import MembersPopper from 'components/MembersPopper'

const DashboardPage = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const currentDashboard = useSelector(currentDashboardState)
  const cardList = useSelector(boardCardsState)

  const dashboardDoc =  currentDashboard && doc(generalBoardCollection, currentDashboard.id)

  const [isDashboardTitleEditOpen, setIsDashboardTitleEditOpen] = useState(false)
  const [dashboardTitle, setDashboardTitle] = useState(currentDashboard ? currentDashboard.title : "")

  const updateDashboardTitle = async (e) => {
    e.preventDefault()

    updateDoc(dashboardDoc, {
      title: dashboardTitle
    })
    dispatch(setCurrentDashboard({...currentDashboard, title:dashboardTitle}))
    setIsDashboardTitleEditOpen(false)
  }

  const spreadCardList = [...cardList]
  
  const sortedCardList = spreadCardList.sort((a,b) => {
    return new Date(a.timeOfAdd) - new Date(b.timeOfAdd);
  });

  return (
    <Container maxWidth="lg">
      <Stack direction="row" spacing={2} pt={2}>
        <Button onClick={() => navigate("/home")} startIcon={<MdOutlineArrowBackIos/>} variant='contained'>
          Back
        </Button>
        {!isDashboardTitleEditOpen ? (
          <Button
            onClick={() => setIsDashboardTitleEditOpen(true)}
            variant="outlined"
            sx={{ justifyContent: 'flex-start', '&:hover': { backgroundColor: '#e6e6e6' } }}
          >
            {dashboardTitle}
          </Button>
        ) : (
          <form action="" onSubmit={(e) => updateDashboardTitle(e)}>
            <TextField
            value={dashboardTitle}
            onChange={(e) => setDashboardTitle(e.target.value)}
            sx={{ backgroundColor: 'white' }}
            size="small"
            variant="outlined"
          />
          </form>
        )}
        <MembersPopper  />
      </Stack>
      <Box pt={3}>
        <Stack spacing={2} direction="row">
          {sortedCardList && sortedCardList.map((card) => <BoardCard key={card.id} card={card} />)}
          <AddNewListBtn />
        </Stack>
      </Box>
    </Container>
  )
}

export default DashboardPage
