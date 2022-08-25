import React, { useState } from 'react'
import { useSelector } from 'react-redux'

import { Container, Box, Stack, Button, TextField } from '@mui/material'
import { useNavigate} from "react-router-dom"
import CustomSelect from 'components/CustomSelect'
import { currentDashboardState, setCurrentDashboard } from 'store/slices/dashboardsSlice'
import BoardCard from 'components/BoardCard'
import AddNewListBtn from 'components/AddNewListBtn'
import { boardCardsState } from 'store/slices/dashboardsSlice'
import {MdOutlineArrowBackIos} from "react-icons/md"
import { doc, updateDoc } from 'firebase/firestore'
import { usersCollection } from 'firebase-client'
import { currentUserStateId } from 'store/slices/usersSlice'
import { useDispatch } from 'react-redux'

const DashboardPage = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const currentDashboard = useSelector(currentDashboardState)
  const cardList = useSelector(boardCardsState)
  const userId = useSelector(currentUserStateId)

  const dashboardDoc =  currentDashboard && doc(usersCollection, `${userId}`, "dashboards", currentDashboard.id)
  console.log(currentDashboard)
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
        <CustomSelect />
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
