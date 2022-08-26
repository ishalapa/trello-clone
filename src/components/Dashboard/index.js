import React from 'react'

import { Button, Grid, IconButton, Box } from '@mui/material'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setCurrentDashboard } from 'store/slices/dashboardsSlice'
import { collection, deleteDoc, doc } from 'firebase/firestore'

import { AiFillDelete } from 'react-icons/ai'
import { usersCollection } from 'firebase-client'
import { useSelector } from 'react-redux'
import { currentUserStateId } from 'store/slices/usersSlice'
import { generalBoardCollection } from 'firebase-client'

const Dashboard = ({ board }) => {
  const dispatch = useDispatch()
  const userId = useSelector(currentUserStateId)

  // const dashboardCollection = collection(usersCollection, `${userId}`, 'dashboards')

  const openDashboardPage = async (id) => {
    dispatch(setCurrentDashboard({ title: board.title, id: id, members: board.members }))
  }

  const handleDelete = async (id) => {
    await deleteDoc(doc(generalBoardCollection, id))
  }

  return (
    <Grid item xs={6} md={3}>
      <Box
        position="relative"
        onClick={() => {
          openDashboardPage(board.id)
        }}
      >
        <Link to={`/home/:${board.title.replace(/\s+/g, '+')}`}>
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
