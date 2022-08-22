import React, { useState } from 'react'

import { Button, Box, Stack, IconButton, TextField, Alert } from '@mui/material'
import { AiOutlinePlus, AiOutlineClose } from 'react-icons/ai'
import { addDoc, collection } from 'firebase/firestore'
import { useSelector } from 'react-redux'
import { currentDashboardIdState } from 'store/slices/dashboardsSlice'
import { usersCollection } from 'firebase-client'
import { currentUserStateId } from 'store/slices/usersSlice'

const AddNewListBtn = () => {
  const [isNewListInputOpen, setIsNewListInputOpen] = useState(false)
  const [boardCardText, setBoardCardText] = useState('')
  const [isValid, setIsValid] = useState(true)

  const userId = useSelector(currentUserStateId)

  const dashboardId = useSelector(currentDashboardIdState)
  const dashboardsCollection = collection(usersCollection, `${userId}`, "dashboards")
  const cardsCollection = collection(dashboardsCollection, `${dashboardId}`, 'cards')

  const addNewList = async (e) => {
    e.preventDefault()

    if (!boardCardText.trim()) {
      setIsValid(false)
    } else {
      setIsValid(true)

      addDoc(cardsCollection, {
        title: boardCardText,
        timeOfAdd: new Date().getTime()
      })
      setBoardCardText('')
    }
  }
  return (
    <form onSubmit={addNewList}>
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
            required
            value={boardCardText}
            onChange={(e) => setBoardCardText(e.target.value)}
            sx={{ backgroundColor: 'white' }}
            size="small"
            variant="outlined"
            multiline
            minRows={1}
            maxRows={5}
            placeholder="Enter a title for this card"
            fullWidth
          />
          {!isValid && <Alert sx={{mt: "3px"}} severity="warning">Try another title</Alert>}
            <Stack pt={1} spacing={1} direction="row" alignItems="center">
              <Button type="submit" variant="contained">
                Add list
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
