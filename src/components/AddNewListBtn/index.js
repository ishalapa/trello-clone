import React, { useState } from 'react'

import { Button, Box, Stack, IconButton, TextField } from '@mui/material'
import { AiOutlinePlus, AiOutlineClose } from 'react-icons/ai'
import { addDoc, collection } from 'firebase/firestore'
import { useSelector } from 'react-redux'
import { currentDashboardIdState } from 'store/slices/dashboardsSlice'
import { usersCollection } from 'firebase-client'
import { currentUserStateId } from 'store/slices/currentUserSlice'

const AddNewListBtn = () => {
  const [isNewListInputOpen, setIsNewListInputOpen] = useState(false)
  const [inp, setInp] = useState('')
  const userId = useSelector(currentUserStateId)

  const dashboardId = useSelector(currentDashboardIdState)
  const dashboardsCollection = collection(usersCollection, `${userId}`, "dashboards")
  const cardsCollection = collection(dashboardsCollection, `${dashboardId}`, 'cards')

  const handleSubmit = async (e) => {
    e.preventDefault()
    addDoc(cardsCollection, {
      title: inp,
    })
    setInp('')
  }
  return (
    <form onSubmit={handleSubmit}>
      {!isNewListInputOpen ? (
        <Button
          size="medium"
          startIcon={<AiOutlinePlus />}
          onClick={() => setIsNewListInputOpen(true)}
          variant="outlined"
          sx={{
            justifyContent: 'flex-start',
            width: '290px',
            height: '40px',
            '&:hover': { backgroundColor: '#e6e6e6' },
          }}
        >
          Add another list
        </Button>
      ) : (
        <Box width="290px">
          <TextField
            value={inp}
            onChange={(e) => setInp(e.target.value)}
            sx={{ backgroundColor: 'white' }}
            size="small"
            variant="outlined"
            multiline
            minRows={1}
            maxRows={5}
            placeholder="Enter a title for this card"
            fullWidth
          />
            <Stack pt={1} spacing={1} direction="row" alignItems="center">
              <Button type="submit" variant="contained">
                Add card
              </Button>
              <IconButton onClick={() => setIsNewListInputOpen(false)} size="small">
                <AiOutlineClose />
              </IconButton>
            </Stack>
        </Box>
      )}
    </form>
  )
}

export default AddNewListBtn
