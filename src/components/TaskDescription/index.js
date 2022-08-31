import React, { useState } from 'react'

import { Card, Modal, Typography, Grid, Box, TextField, Stack, Button, IconButton } from '@mui/material'
import { AiOutlinePlus, AiOutlineClose } from 'react-icons/ai'
import { useSelector } from 'react-redux'
import { currentTaskState, setCurrentTaskTitle } from 'store/slices/tasksSlice'
import { arrayRemove, arrayUnion, doc, updateDoc } from 'firebase/firestore'
import { currentDashboardIdState } from 'store/slices/dashboardsSlice'
import Description from 'components/Description'
import { descriptionState, setDescriptionId } from 'store/slices/descriptionSlice'
import { useDispatch } from 'react-redux'
import CommentWrite from 'components/CommentWrite'
import { MdOutlineDescription, MdOutlineSubtitles } from 'react-icons/md'
import Comment from 'components/Comment'
import { generalBoardCollection } from 'firebase-client'
import AssignMembersPopper from 'components/AssignMembersPopper'
import AssignedMembers from 'components/AssignMembersPopper/AssignedMembers'

const TaskDescription = ({ isDescriptionModalOpen, closeDescriptionModal, card }) => {
  const dispatch = useDispatch()
  const dashboardId = useSelector(currentDashboardIdState)
  const currentTask = useSelector(currentTaskState)
  const description = useSelector(descriptionState)

  const genNumKey = (key) => {
    return key + new Date().getTime()
  }

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


  const descriptionDoc = doc(generalBoardCollection, `${dashboardId}`, 'cards', card.id)
  const tasksDoc = doc(generalBoardCollection, `${dashboardId}`, 'cards', card.id)

  const [isDescriptionOpen, setIsDescriptionOpen] = useState(false)
  const [descriptionText, setDescriptionText] = useState('')
  const [taskTitle, setTaskTitle] = useState('')
  
  const [isEditTitleOpen, setIsEditTitleOpen] = useState(false)

  const updateDascription = async (e) => {
    e.preventDefault()
    await updateDoc(descriptionDoc, {
      descriptions: arrayRemove({ title: description.title, id: currentTask.id }),
    })
    await dispatch(setDescriptionId(null))
    await updateDoc(descriptionDoc, {
      descriptions: arrayUnion({ title: descriptionText, id: currentTask.id }),
    })
    setIsDescriptionOpen(false)
    setDescriptionText('')
  }

  const editTaskTitle = async () => {
    setIsEditTitleOpen(true)
    setTaskTitle(currentTask.title)
  }

  const updateTaskTitle = async () => {
    await updateDoc(tasksDoc, {
      tasks: arrayRemove({ title: currentTask.title, id: currentTask.id }),
    })
    await updateDoc(tasksDoc, {
      tasks: arrayUnion({ title: taskTitle, id: currentTask.id }),
    })
    dispatch(setCurrentTaskTitle(taskTitle))
    setIsEditTitleOpen(false)
    setTaskTitle('')
  }

  const openDescription = () => {
    setIsDescriptionOpen(true)
    setDescriptionText(description && description.title)
  }

  const deleteTask = async () => {
    await updateDoc(tasksDoc, {
      tasks: arrayRemove({ title: currentTask.title, id: currentTask.id }),
    })
    card.descriptions &&
      card.descriptions.map(async (desc) => {
        if (desc.id === currentTask.id) {
          await updateDoc(tasksDoc, {
            descriptions: arrayRemove({ title: desc.title, id: desc.id }),
          })
        }
      })
    closeDescriptionModal(setDescriptionText, setIsDescriptionOpen)
  }

  return (
    <Modal
      open={isDescriptionModalOpen}
      onClose={() => closeDescriptionModal(setDescriptionText, setIsDescriptionOpen)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Card sx={style}>
        <Grid container>
          <Grid item md={10} width={'95%'}>
            <Grid container>
              <Grid item md={1}>
                <MdOutlineSubtitles size={27} color={'#595959'} />
              </Grid>
              <Grid item md={11}>
                {!isEditTitleOpen ? (
                  <Box onClick={editTaskTitle} display={'inline-block'} sx={{ cursor: 'pointer' }}>
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
                      value={taskTitle}
                      onChange={(e) => setTaskTitle(e.target.value)}
                    />
                    <Button onClick={updateTaskTitle} size="small" sx={{ width: '40px' }} variant="contained">
                      Save
                    </Button>
                  </Stack>
                )}
                <Typography id="modal-modal-title" variant="subtitle1">
                  in list <u>{card.title}</u>
                </Typography>
              </Grid>
            </Grid>
            <AssignedMembers tasksDoc={tasksDoc} card={card} />
            <Grid container pt={2}>
              <Grid item md={1}>
                <MdOutlineDescription size={27} color={'#595959'} />
              </Grid>
              <Grid item md={11}>
                <Typography variant="h6" id="modal-modal-description">
                  Description
                </Typography>
                {!isDescriptionOpen &&
                  card.descriptions &&
                  currentTask &&
                  card.descriptions.map((desc) => {
                    if (desc.id === currentTask.id) {
                      return <Description key={new Date().getTime()} desc={desc} />
                    }
                  })}
                {!isDescriptionOpen ? (
                  <Button
                    size="medium"
                    onClick={openDescription}
                    startIcon={<AiOutlinePlus />}
                    variant="text"
                    sx={{
                      justifyContent: 'flex-start',
                      marginTop: '5px',
                      marginBottom: '15px',
                      '&:hover': { backgroundColor: '#e6e6e6' },
                    }}
                  >
                    {description.title && description.id === currentTask.id
                      ? 'Update description'
                      : 'Add more detailed description'}
                  </Button>
                ) : (
                  <Box pb={1} pt={1}>
                    <TextField
                      value={descriptionText}
                      onChange={(e) => setDescriptionText(e.target.value)}
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
                      <IconButton onClick={() => setIsDescriptionOpen(false)} size="small">
                        <AiOutlineClose />
                      </IconButton>
                    </Stack>
                  </Box>
                )}
              </Grid>
            </Grid>
            <Stack spacing={2}>
              <CommentWrite card={card} />
              <Stack spacing={2}>
                {card.comments &&
                  currentTask.title &&
                  card.comments.map((comment, index) => {
                    if (comment.id === currentTask.id) {
                      return <Comment card={card} key={genNumKey(index)} comment={comment} />
                    }
                  })}
              </Stack>
            </Stack>
          </Grid>
          <Grid item md={2}>
            <Stack spacing={1}>
              <Button onClick={deleteTask} variant="outlined" color="error">
                Delete this task
              </Button>
              <Stack >

              </Stack>
            </Stack>
          </Grid>
        </Grid>
      </Card>
    </Modal>
  )
}

export default TaskDescription
