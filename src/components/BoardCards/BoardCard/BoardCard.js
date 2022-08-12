import React, { useState } from 'react'

import { CardContent, Typography, Button, Card, TextField, Box, Stack, IconButton, Modal } from '@mui/material'
import { AiOutlinePlus, AiOutlineClose } from 'react-icons/ai'
import { useSelector } from 'react-redux'
import { arrayUnion, collection, doc, updateDoc } from 'firebase/firestore'
import { currentDashboardIdState } from 'store/slices/currentDashboardSlice'
import { Droppable } from 'react-beautiful-dnd'
import Task from 'components/Tasks/Task'
import { usersCollection } from 'firebase-client'
import { currentUserStateId } from 'store/slices/currentUserSlice'
import TaskDescription from 'components/TaskDescription'

const BoardCard = ({ card }) => {
  const [isBtnClicked, setIsBtnClicked] = useState(false)
  const [openDesc, setOpenDesc] = useState(false)
  const handleOpen = () => setOpenDesc(true)
  const handleClose = () => setOpenDesc(false)
  const [inp, setInp] = useState('')

  const dashboardId = useSelector(currentDashboardIdState)
  const userId = useSelector(currentUserStateId)

  const dashCollection = collection(usersCollection, `${userId}`, 'dashboards')
  const tasksDoc = doc(dashCollection, `${dashboardId}`, 'cards', card.id)

  const genNumKey = (key) => {
    return key + new Date().getTime()
  }

  const addTask = async (e) => {
    e.preventDefault()
    await updateDoc(tasksDoc, {
      tasks: arrayUnion({ title: inp, id: genNumKey(1) }),
    })
    setInp('')
  }
  return (
    <Droppable droppableId={card.title}>
      {(provided) => (
        <Card ref={provided.innerRef} {...provided.droppableProps} sx={{ width: '290px', backgroundColor: '#f2f2f2' }}>
          <CardContent>
            <Typography variant="h6" color="#000066">
              {card.title}
            </Typography>
            <Stack pt={1} spacing={1}>
              {card.tasks &&
                card.tasks.map((task, index) => (
                  <Task key={task.id} task={task} index={index} handleOpen={handleOpen} />
                ))}
            </Stack>
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
                  <Button onClick={addTask} variant="contained">
                    Add card
                  </Button>
                  <IconButton onClick={() => setIsBtnClicked(false)} size="small">
                    <AiOutlineClose />
                  </IconButton>
                </Stack>
              </Box>
            )}
            <TaskDescription openDesc={openDesc} handleClose={handleClose} card={card}/>
          </CardContent>
          {provided.placeholder}
        </Card>
      )}
    </Droppable>
  )
}

export default BoardCard
