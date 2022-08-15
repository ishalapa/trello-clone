import React, { useState } from 'react'

import { Card, Modal, Typography, Grid, Box, TextField, Stack, Button, IconButton } from '@mui/material'
import { AiOutlinePlus, AiOutlineClose } from 'react-icons/ai'
import { useSelector } from 'react-redux'
import { currentTaskState, setCurrentTask, setCurrentTaskTitle } from 'store/slices/currentTaskSlice'
import { arrayRemove, arrayUnion, collection, doc, updateDoc } from 'firebase/firestore'
import { currentDashboardIdState } from 'store/slices/currentDashboardSlice'
import { usersCollection } from 'firebase-client'
import { currentUserStateId } from 'store/slices/currentUserSlice'
import Description from 'components/Description/Description'
import { descriptionState, setDescriptionId } from 'store/slices/descriptionSlice'
import { useDispatch } from 'react-redux'

const TaskDescription = ({ openDesc, handleClose, card }) => {
  const dispatch = useDispatch()
  const dashboardId = useSelector(currentDashboardIdState)
  const currentTask = useSelector(currentTaskState)
  const userId = useSelector(currentUserStateId)
  const description = useSelector(descriptionState)

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '55%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  }

  const dashCollection = collection(usersCollection, `${userId}`, 'dashboards')
  const descriptionDoc = doc(dashCollection, `${dashboardId}`, 'cards', card.id)
  const tasksDoc = doc(dashCollection, `${dashboardId}`, 'cards', card.id)

  const [isBtnClicked, setIsBtnClicked] = useState(false)
  const [inp, setInp] = useState('')

  const updateDascription = async (e) => {
    e.preventDefault()

    await updateDoc(descriptionDoc, {
      descriptions: arrayRemove({ title: description.title, id: currentTask.id }),
    })
    await dispatch(setDescriptionId(null))
    await updateDoc(descriptionDoc, {
      descriptions: arrayUnion({ title: inp, id: currentTask.id }),
    })
    setIsBtnClicked(false)
    setInp('')
  }
  const [editTaskTitle, setEditTaskTitleOpen] = useState(false)
  const [editInp, setEditInp] = useState('')
  const updateTaskTitleOpen = async () => {
    setEditTaskTitleOpen(true)
    setEditInp(currentTask.title)
    
  }
  const updateTaskTitle = async () => {
    
    await updateDoc(tasksDoc, {
      tasks: arrayRemove({ title: currentTask.title, id: currentTask.id }),
    })
    await updateDoc(tasksDoc, {
      tasks: arrayUnion({ title: editInp, id: new Date().getTime() }),
    })
    dispatch(setCurrentTaskTitle(editInp))
    setEditTaskTitleOpen(false)
    setEditInp("")
  }
  const openDescription = () => {
    setIsBtnClicked(true)
    setInp(description.title)
  }

  return (
    <Modal
      open={openDesc}
      onClose={() => handleClose(setInp, setIsBtnClicked)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Card sx={style}>
        <Grid container>
          <Grid item md={10}>
            <Box width="95%">
              {!editTaskTitle ? (
                <Box onClick={updateTaskTitleOpen} display={"inline-block"} sx={{cursor: "pointer"}}>
                  <Typography id="modal-modal-title" variant="h5" component="h2">
                    {currentTask && currentTask.title}
                  </Typography>
                </Box>
              ) : (
                <Stack spacing={1}>
                  <TextField
                    type={'text'}
                    size="small"
                    sx={{ width: '320px' }}
                    value={editInp}
                    onChange={(e) => setEditInp(e.target.value)}
                  />
                  <Button onClick={updateTaskTitle} size="small" sx={{ width: '40px' }} variant="contained">
                    Save
                  </Button>
                </Stack>
              )}

              <Typography id="modal-modal-title" variant="subtitle1">
                in list <u>{card.title}</u>
              </Typography>
              <Typography variant="h6" id="modal-modal-description" sx={{ mt: 2 }}>
                Description
              </Typography>
              {!isBtnClicked && card.descriptions &&
                currentTask &&
                card.descriptions.map((desc) => {
                  if (desc.id === currentTask.id) {
                    return <Description key={new Date().getTime()} desc={desc} />
                  }
                })}
              {!isBtnClicked ? (
                <Button
                size='medium'
                  onClick={openDescription}
                  startIcon={<AiOutlinePlus />}
                  variant="text"
                  sx={{ justifyContent: 'flex-start', marginTop: '5px', '&:hover': { backgroundColor: '#e6e6e6' } }}
                >
                  {description.title && description.id === currentTask.id
                    ? 'Update description'
                    : 'Add more detailed description'}
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
                    minRows={4}
                    maxRows={6}
                    placeholder="Add more detailed description"
                    fullWidth
                  />
                  <Stack pt={1} spacing={1} direction="row" alignItems="center">
                    <Button onClick={(e) => updateDascription(e)} variant="contained">
                      {description.title && description.id === currentTask.id ? 'Update' : 'Add description'}
                    </Button>
                    <IconButton onClick={() => setIsBtnClicked(false)} size="small">
                      <AiOutlineClose />
                    </IconButton>
                  </Stack>
                </Box>
              )}
            </Box>
          </Grid>
          <Grid item md={2}>
            <ul>
              <li>dsa</li>
              <li>dsa</li>
              <li>dsad</li>
              <li>dsad</li>
              <li>dsad</li>
            </ul>
          </Grid>
        </Grid>
      </Card>
    </Modal>
  )
}

export default TaskDescription
