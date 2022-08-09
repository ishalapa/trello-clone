import React from 'react'

import { Button, Grid, IconButton, Box } from '@mui/material'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setCurrentDashboard, setCurrentDashboardId } from 'store/slices/currentDashboardSlice'
import { deleteDoc, doc, getDoc } from 'firebase/firestore'
import { dashboardsCollection } from 'firebase-client'

import { AiFillDelete } from 'react-icons/ai'

const Dashboard = ({ board }) => {
  const dispatch = useDispatch()

  const handleClick = async (id) => {
    const docRef = doc(dashboardsCollection, id)
    const docSnap = await getDoc(docRef)
    dispatch(setCurrentDashboardId(board.id))
    dispatch(setCurrentDashboard(docSnap.data()))
  }
  const handleDelete = async (id) => {
    await deleteDoc(doc(dashboardsCollection, id))
  }
  const urlTitle = board.title.replace(/\s+/g, '+')

  return (
    <Grid item xs={6} md={3}>
      <Box position="relative" onClick={() => {
            handleClick(board.id)
          }}>
        <Link
          to={`/home/:${urlTitle}`}
        >
          <Button sx={{ width: '200px', height: '200px' }} variant="outlined" size="large">
            {board.title}
          </Button>
        </Link>
        <IconButton
          onClick={() => handleDelete(board.id)}
          sx={{ position: 'absolute', left: '160px', top: '1px', zIndex: 10, color: '#800000' }}
        >
          <AiFillDelete />
        </IconButton>
      </Box>
    </Grid>
  )
}

export default Dashboard
