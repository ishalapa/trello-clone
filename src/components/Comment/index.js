import React, { useState } from 'react'

import { Grid, Card, Typography, Box, TextField, Stack, Button } from '@mui/material'
import UserCircle from 'ui/UserCircle'

import { arrayRemove, arrayUnion, doc, updateDoc } from 'firebase/firestore'

import { useSelector } from 'react-redux'
import { currentDashboardIdState } from 'store/slices/dashboardsSlice'
import { currentTaskState } from 'store/slices/tasksSlice'
import { generalBoardCollection } from 'firebase-client'
import { currentUserStateName } from 'store/slices/usersSlice'

const Comment = ({ comment, card }) => {
  const dashboardId = useSelector(currentDashboardIdState)
  const currentTask = useSelector(currentTaskState)
  const userName = useSelector(currentUserStateName)

  const commentDoc = doc(generalBoardCollection, `${dashboardId}`, 'cards', card.id)

  const [editCommentInp, setEditCommentInp] = useState('')
  const [isEditCommentOpen, setIsEditCommentOpen] = useState(false)

  const updateComment = async () => {
    await updateDoc(commentDoc, {
      comments: arrayRemove({
        title: comment.title,
        id: comment.id,
        timeOfAdd: comment.timeOfAdd,
        author: comment.author,
        time: comment.time,
        edited: comment.edited
      }),
    })
    await updateDoc(commentDoc, {
      comments: arrayUnion({
        title: editCommentInp,
        id: currentTask.id,
        timeOfAdd: comment.timeOfAdd,
        author: userName,
        time: comment.time,
        edited: true
      }),
    })
  }
  const openEditComment = () => {
    setIsEditCommentOpen(true)
    setEditCommentInp(comment.title)
  }

  const deleteComment = async () => {
    await updateDoc(commentDoc, {
      comments: arrayRemove({
        title: comment.title,
        id: currentTask.id,
        timeOfAdd: comment.timeOfAdd,
        author: comment.author,
        time: comment.time,
        edited: comment.edited
      }),
    })
  }

  const handleClick = () => null
  return (
    <Grid container>
      <Grid item xs={2} md={1} display={'flex'} alignItems={'center'}>
        <Box sx={{ position: 'relative', top: '-30px' }}>
          <UserCircle authorName={comment.author} handleClick={handleClick} size={35} />
        </Box>
      </Grid>
      <Grid item xs={10} md={11} display={'flex'} alignItems={'center'}>
        {!isEditCommentOpen ? (
          <Box display={'flex'} flexDirection={'column'} width="100%">
            <Stack sx={{ display: 'flex', alignItems: 'center' }} direction={'row'} spacing={1}>
              <Typography fontWeight={600} variant="body1">
                {comment.author}
              </Typography>
              <Typography fontWeight={300} variant="subtitle2" color={'gray'}>
                {comment.time}
                {comment.edited && " (edited)"}
              </Typography>
            </Stack>
            <Card sx={{ minHeight: '35px', width: '100%', display: 'flex', alignItems: 'center'}}>
              <Typography p={2}>{comment.title}</Typography>
            </Card>
            <Stack pt={1} direction="row" spacing={2}>
              <Button variant="text" size="small" onClick={openEditComment}>
                <Typography fontSize={10}>Edit</Typography>
              </Button>
              <Button variant="text" size="small" color="error" onClick={deleteComment}>
                <Typography fontSize={10}>Delete</Typography>
              </Button>
            </Stack>
          </Box>
        ) : (
          <Box width={'100%'} pt={1}>
            <TextField
              value={editCommentInp}
              onChange={(e) => setEditCommentInp(e.target.value)}
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
