import React from 'react'

import { Button, Grid } from '@mui/material'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setCurrentDashboard, setCurrentDashboardId } from 'store/slices/currentDashboardSlice'
import { doc, getDoc } from 'firebase/firestore'
import { dashboardsCollection } from 'firebase-client'


const Dashboard = ({ board }) => {
  const dispatch = useDispatch()

  const handleClick = async (id) => {
    const docRef = doc(dashboardsCollection, id)
    const docSnap = await getDoc(docRef)
    dispatch(setCurrentDashboardId(board.id))
    dispatch(setCurrentDashboard(docSnap.data()))
  }
  const urlTitle = board.title.replace(/\s+/g, '+')

  return (
    <Grid item xs={6} md={3}>
      <Link
        onClick={() => {
          handleClick(board.id)
        }}
        to={`/home/:${urlTitle}`}
      >
        <Button sx={{ width: '200px', height: '200px' }} variant="outlined" size="large">
          {board.title}
        </Button>
      </Link>
    </Grid>
  )
}

export default Dashboard
