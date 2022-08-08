import React, {useState} from 'react'

import {
  Modal,
  Card,
  CardMedia,
  Box,
  Button,
  Typography,
  Divider,
  TextField,
  FormHelperText,
} from '@mui/material'
import { addDoc } from 'firebase/firestore'
import { dashboardsCollection } from 'firebase-client'


const AddBoardForm = ({ open, setIsOpen }) => {
  const [inp, setInp] = useState("")
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    addDoc(dashboardsCollection, {
      title: inp
    })
    setInp("")
    setIsOpen(false)
  }
  return (
    <Modal
      open={open}
      onClose={() => setIsOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Card sx={style}>
        <Typography pb={1} align="center" id="modal-modal-title" variant="h5" component="h2">
          Create Board
        </Typography>
        <Divider />
        <CardMedia
          component="img"
          image="https://a.trellocdn.com/prgb/dist/images/board-preview-skeleton.14cda5dc635d1f13bc48.svg"
          height="130"
        />
        <Typography align="center" pt={2} id="modal-modal-title" variant="body1">
          A board is made up of cards ordered on lists. Use it to manage projects, track information of organize
          anything.
        </Typography>
        <Typography pt={2} id="modal-modal-title" variant="h6" component="h6">
          Board title:
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField value={inp} onChange={(e) => setInp(e.target.value)} sx={{ width: '300px' }} id="my-input" aria-describedby="my-helper-text" />
          <FormHelperText id="my-helper-text">Board title is required</FormHelperText>
        
        <Box display="flex" justifyContent="center" pt={1}>
          <Button type='submit' variant="contained">Submit</Button>
        </Box>
        </form>
      </Card>
    </Modal>
  )
}

export default AddBoardForm
