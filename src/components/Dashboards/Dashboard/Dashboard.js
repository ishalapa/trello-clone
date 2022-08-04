import React from 'react'

import { Button, Grid } from '@mui/material'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { currentDashboardState, setCurrentDashboard } from 'store/slices/currentDashboardSlice'
import { doc, getDoc } from 'firebase/firestore'
import { dashboardsCollection } from 'firebase-client'

const Dashboard = ({ board }) => {
  const { path } = useParams()

  const dispatch = useDispatch()
  const currentDashboard = useSelector(currentDashboardState)
  const handleClick = async (id) => {
    const docRef = doc(dashboardsCollection, id)
    const docSnap = await getDoc(docRef)
    dispatch(setCurrentDashboard(docSnap.data()))
  }
  return (
    <Grid item xs={6} md={3}>
      <Button
        onClick={() => {
          handleClick(board.id)
        }}
        sx={{ width: '200px', height: '200px' }}
        variant="outlined"
        size="large"
      >
        {board.title}
      </Button>
    </Grid>
  )
}

export default Dashboard
