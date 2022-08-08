import React, { useState, useEffect } from 'react'

import { CardContent, Typography, Button, Card, TextField, Box, Stack, IconButton } from '@mui/material'
import { AiOutlinePlus, AiOutlineClose } from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux'
import { addDoc, collection, doc, getDoc, onSnapshot } from 'firebase/firestore'
import { currentDashboardIdState } from 'store/slices/currentDashboardSlice'
import { dashboardsCollection } from 'firebase-client'
import { setTasks, tasksState } from 'store/slices/tasksSlice'
import Tasks from 'components/Tasks'

const BoardCard = ({card}) => {
  const [isBtnClicked, setIsBtnClicked] = useState(false)
  const [inp, setInp] = useState("")
  const dispatch = useDispatch()
  const dashboardId = useSelector(currentDashboardIdState)
  const tasks = useSelector(tasksState)
  const tasksCollection = collection(dashboardsCollection, `${dashboardId}`, "cards", card.id, "tasks")

  useEffect(() => {
    onSnapshot(tasksCollection, (snapshot) => {
      const taskSnap = snapshot.docs.map((doc) => {
        return { ...doc.data(), id: doc.id }
      })
      dispatch(setTasks(taskSnap))
    })
  }, [dashboardId])
  console.log(tasks)
  const addTask = async (e) => {
    e.preventDefault()
    addDoc(tasksCollection, {
      title: inp
    })
    setInp("")
  }
  return (
    <Card sx={{ width: '290px', backgroundColor:"#f2f2f2" }}>
      <CardContent>
        <Typography variant="h6" color="#000066">
          {card.title}
        </Typography>
        <Tasks />
        {!isBtnClicked ? (
          <Button
            onClick={() => setIsBtnClicked(true)}
            startIcon={<AiOutlinePlus />}
            fullWidth
            variant="text"
            sx={{ justifyContent: 'flex-start', marginTop: '5px', '&:hover': { backgroundColor: '#e6e6e6' } }}
          >
            Add card
          </Button>
        ) : (
          <Box pt={1}>
            <TextField
              value={inp}
              onChange={(e)=> setInp(e.target.value)}
              sx={{backgroundColor:"white"}}
              size="small"
              variant="outlined"
              multiline
              minRows={1}
              maxRows={5}
              placeholder="Enter a title for this card"
              fullWidth
            />
            <Stack pt={1} spacing={1} direction="row" alignItems="center">
              <Button onClick={addTask} variant="contained">Add card</Button>
              <IconButton onClick={() => setIsBtnClicked(false)} size="small">
                <AiOutlineClose />
              </IconButton>
            </Stack>
          </Box>
        )}
      </CardContent>
    </Card>
  )
}

export default BoardCard
