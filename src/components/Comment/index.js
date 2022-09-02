import React, { useState } from 'react'

import { Grid, Card, Typography, Box, TextField, Stack, Button } from '@mui/material'
import UserCircle from 'ui/UserCircle'

import { arrayRemove, doc, updateDoc } from 'firebase/firestore'

import { useSelector } from 'react-redux'
import { currentDashboardIdState } from 'store/slices/dashboardsSlice'
import { currentTaskState } from 'store/slices/tasksSlice'
import { generalBoardCollection } from 'firebase-client'

const Comment = ({ comment, card }) => {
  const dashboardId = useSelector(currentDashboardIdState)
  const currentTask = useSelector(currentTaskState)

  const commentDoc = doc(generalBoardCollection, `${dashboardId}`, 'cards', card.id)

  const [editInp, setEditInp] = useState('')
  const [isEditCommentOpen, setIsEditCommentOpen] = useState(false)

  

  const updateComment = async () => {
    await updateDoc(commentDoc, {
      comments: arrayRemove({ title: comment.title, id: comment.id, unic: comment.unic }),
    })
  }
  const openEditComment = () => {
    setIsEditCommentOpen(true)
    setEditInp(comment.title)
  }

  const deleteComment = async () => {
    await updateDoc(commentDoc, {
      comments: arrayRemove({ title: comment.title, id: currentTask.id, unic: comment.unic }),
    })
  }

  const handleClick = () => null
  return (
    <Grid container>
      <Grid item xs={2} md={1} display={'flex'} alignItems={'center'}>
        <Box sx={{position: "relative", top:"-30px"}}><UserCircle iconName={comment.author} handleClick={handleClick} size={35} /></Box>
        
      </Grid>
      <Grid item xs={10} md={11} display={'flex'} alignItems={'center'}>
        {!isEditCommentOpen ? (
          <Box display={'flex'} flexDirection={'column'} width="100%">
            <Typography fontWeight={600} variant='body1'>{comment.author}</Typography>
            <Card sx={{ height: '40px', width: '100%', display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
              <Typography p={2}>{comment.title}</Typography>
            </Card>
            <Stack pt={1} direction="row" spacing={2}>
              <Button variant="text" size="small" onClick={openEditComment}>
                <Typography fontSize={10} >
                  Edit
                </Typography>
              </Button>
              <Button variant="text" size="small" color="error" onClick={deleteComment}>
                <Typography fontSize={10}>Delete</Typography>
              </Button>
            </Stack>
          </Box>
        ) : (
          <Box width={'100%'} pt={1}>
            <TextField
              value={editInp}
              onChange={(e) => setEditInp(e.target.value)}
              sx={{ backgroundColor: 'white' }}
              size="small"
              variant="outlined"
              multiline
              minRows={1}
              maxRows={5}
              placeholder="Write a comment..."
              fullWidth
            />
            <Stack pt={1} spacing={1} direction="row" alignItems="center">
              <Button onClick={updateComment} variant="contained">
                Save
              </Button>
            </Stack>
          </Box>
        )}
      </Grid>
    </Grid>
  )
}

export default Comment
