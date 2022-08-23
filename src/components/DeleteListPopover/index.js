import React, { useState } from 'react'

import { IconButton, Popover, Typography, Stack, Button, Box } from '@mui/material'
import { AiFillDelete } from 'react-icons/ai'
import { collection, deleteDoc, doc } from 'firebase/firestore'
import { useSelector } from 'react-redux'
import { currentDashboardIdState } from 'store/slices/dashboardsSlice'
import { usersCollection } from 'firebase-client'
import { currentUserStateId } from 'store/slices/usersSlice'

const DeletePopover = ({ title, card }) => {
  const dashboardId = useSelector(currentDashboardIdState)
  const userId = useSelector(currentUserStateId)
  const dashboardsCollection = collection(usersCollection, `${userId}`, "dashboards")
  const cardsCollection = collection(dashboardsCollection, `${dashboardId}`, 'cards')
  const [anchorEl, setAnchorEl] = useState(null)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const deleteList = async (id) => {
    await deleteDoc(doc(cardsCollection, id))
  }

  const open = Boolean(anchorEl)
  const id = open ? 'simple-popover' : undefined
  return (
    <div>
      <IconButton aria-describedby={id} onClick={handleClick}>
        <AiFillDelete color="#800000" />
      </IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Typography pt={2} pl={2} pr={2} variant="h6">
          Are you sure, you want to delete list <u>{title}</u>, with all tasks it contains?
        </Typography>
        <Box p={2} display={'flex'} justifyContent={'center'}>
          <Stack textAlign={'center'} direction={'row'} spacing={3}>
            <Button onClick={() => deleteList(card.id)} color="error" variant="outlined">
              Delete
            </Button>
            <Button onClick={handleClose} variant="outlined">
              Cancel
            </Button>
          </Stack>
        </Box>
      </Popover>
    </div>
  )
}

export default DeletePopover
