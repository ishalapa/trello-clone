import React from 'react'

import { Button, Grid, IconButton, Box } from '@mui/material'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setCurrentDashboard, setCurrentDashboardId } from 'store/slices/currentDashboardSlice'
import { collection, deleteDoc, doc, getDoc } from 'firebase/firestore'

import { AiFillDelete } from 'react-icons/ai'
import { usersCollection } from 'firebase-client'
import { useSelector } from 'react-redux'
import { currentUserStateId } from 'store/slices/currentUserSlice'

const Dashboard = ({ board }) => {
  const dispatch = useDispatch()
  const userId = useSelector(currentUserStateId)
  const dashboardCollection = collection(usersCollection, `${userId}`, "dashboards")

  const handleClick = async (id) => {
    const docRef = doc(dashboardCollection, id)
    const docSnap = await getDoc(docRef)
    dispatch(setCurrentDashboardId(board.id))
    dispatch(setCurrentDashboard(docSnap.data()))
  }
  const handleDelete = async (id) => {
    await deleteDoc(doc(dashboardCollection, id))
  }

  return (
    <Grid item xs={6} md={3}>
      <Box position="relative" onClick={() => {
            handleClick(board.id)
          }}>
        <Link
          to={`/home/:${board.title.replace(/\s+/g, '+')}`}
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
