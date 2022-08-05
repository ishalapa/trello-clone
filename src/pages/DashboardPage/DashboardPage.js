import { Container, Box } from '@mui/material'
import BoardCard from 'components/BoardCard'
import React from 'react'
import { useSelector } from 'react-redux'
import { currentDashboardState } from 'store/slices/currentDashboardSlice'

const DashboardPage = () => {
  const currentDashboard = useSelector(currentDashboardState)
  return (
    <Container maxWidth="md">
      {currentDashboard && currentDashboard.title}
      <Box pt={3}>
        <BoardCard />
      </Box>
    </Container>
  )
}

export default DashboardPage
