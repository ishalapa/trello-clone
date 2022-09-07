import React, { useState } from 'react'

import 'assets/scss/Home.scss'

import { Box, Typography, Grid, Button } from '@mui/material'
import { Container } from '@mui/system'

import { CgTrello } from 'react-icons/cg'

import { useSelector } from 'react-redux'
import { dashboardsState } from 'store/slices/dashboardsSlice'
import Dashboard from 'components/Dashboard'
import { currentUserStateEmail } from 'store/slices/usersSlice'
import AddBoardForm from 'ui/AddBoardForm'

const DashboardListPage = () => {
  const dashboardList = useSelector(dashboardsState)
  const userEmail = useSelector(currentUserStateEmail)

  const copiedDashboards = [...dashboardList]

  const sortedDashboardList = copiedDashboards.sort((a, b) => {
    return new Date(a.timeOfAdd) - new Date(b.timeOfAdd)
  })

  const [openModal, setOpenModal] = useState(false)
  return (
    <Container maxWidth="md">
      <Box pt="30px">
        <Box width="220px" display="flex" justifyContent="space-between" alignItems="center" pb="15px">
          <CgTrello size={40} color="#0073e6" />
          <Typography variant="h5">Trello Workspace</Typography>
        </Box>
        <Grid container textAlign="center" spacing={2}>
          {sortedDashboardList &&
            sortedDashboardList.map((board) => {
              if (board.members && board.members.includes(userEmail)) {
                return <Dashboard key={board.id} board={board} />
              }
            })}
          <Grid item xs={4} md={3}>
            <Box position="relative" onClick={() => setOpenModal(true)}>
              <Button sx={{ width: '200px', height: '200px' }} variant="outlined" size="large">
                Create board
              </Button>
            </Box>
          </Grid>
        </Grid>
        <AddBoardForm open={openModal} setIsOpen={setOpenModal} />
      </Box>
    </Container>
  )
}

export default DashboardListPage
