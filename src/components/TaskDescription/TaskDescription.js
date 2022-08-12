import React, { useState } from 'react'

import { Card, Modal, Typography, Grid, Box, TextField, Stack, Button, IconButton } from '@mui/material'
import { AiOutlinePlus, AiOutlineClose } from 'react-icons/ai'
import { useSelector } from 'react-redux'
import { currentTaskState } from 'store/slices/currentTaskSlice'
import { arrayUnion, collection, doc, updateDoc } from 'firebase/firestore'
import { currentDashboardIdState } from 'store/slices/currentDashboardSlice'
import { usersCollection } from 'firebase-client'
import { currentUserStateId } from 'store/slices/currentUserSlice'

const TaskDescription = ({ openDesc, handleClose, card }) => {
  const dashboardId = useSelector(currentDashboardIdState)
  const currentTask = useSelector(currentTaskState)
  const userId = useSelector(currentUserStateId)

  const dashCollection = collection(usersCollection, `${userId}`, 'dashboards')
  const descriptionDoc = doc(dashCollection, `${dashboardId}`, 'cards', card.id)

  const addDascription = async (e) => {
    e.preventDefault()
    await updateDoc(descriptionDoc, {
      descriptions: arrayUnion({ title: inp, id: currentTask.id }),
    })
    setIsBtnClicked(false)
    setInp('')
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
  const [inp, setInp] = useState('')
  const [isBtnClicked, setIsBtnClicked] = useState(false)
  const [isDisabled, setIsDisabled] = useState(false)

  return (
    <Modal
      open={openDesc}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Card sx={style}>
        <Grid container>
          <Grid item md={10}>
            <Box width="95%">
              <Typography id="modal-modal-title" variant="h5" component="h2">
                {currentTask && currentTask.title}
              </Typography>
              <Typography id="modal-modal-title" variant="subtitle1">
                in list <u>{card.title}</u>
              </Typography>
              <Typography variant="h6" id="modal-modal-description" sx={{ mt: 2 }}>
                Description
              </Typography>
              {
                card.descriptions &&
                card.descriptions.map((desc) => {
                  if (desc.id === currentTask.id) {
                    setIsDisabled(true)
                    return <Typography variant="body2" sx={{ mt: 1 }}>{desc.title}</Typography>
                  }
                })}
              {!isBtnClicked ? (
                <Button
                  
                  onClick={() => setIsBtnClicked(true)}
                  startIcon={<AiOutlinePlus />}
                  fullWidth
                  variant="text"
                  sx={{ justifyContent: 'flex-start', marginTop: '5px', '&:hover': { backgroundColor: '#e6e6e6' } }}
                >
                  Add more detailed description
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
                    <Button onClick={(e) => addDascription(e)} variant="contained">
                      Add description
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
