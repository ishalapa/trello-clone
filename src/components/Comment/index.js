import React, { useEffect, useState } from 'react'

import { Grid, Card, Typography, Box, TextField, Stack, Button } from '@mui/material'
import UserCircle from 'ui/UserCircle'
import { useDispatch } from 'react-redux'
import { commentState, setCommentId, setCommentTitle } from 'store/slices/commentSlice'
import { arrayRemove, arrayUnion, collection, doc, updateDoc } from 'firebase/firestore'
import { usersCollection } from 'firebase-client'
import { useSelector } from 'react-redux'
import { currentUserStateId } from 'store/slices/currentUserSlice'
import { currentDashboardIdState } from 'store/slices/currentDashboardSlice'
import { currentTaskState } from 'store/slices/currentTaskSlice'

const Comment = ({ comment, card }) => {
  const userId = useSelector(currentUserStateId)
  const dashboardId = useSelector(currentDashboardIdState)
  const currentTask = useSelector(currentTaskState)

  const dashCollection = collection(usersCollection, `${userId}`, 'dashboards')
  const commentDoc = doc(dashCollection, `${dashboardId}`, 'cards', card.id)

  const [editInp, setEditInp] = useState('')
  const [isEditCommentOpen, setIsEditCommentOpen] = useState(false)

  const updateComment = async () => {
    await updateDoc(commentDoc, {
      comments: arrayRemove({ title: comment.title, id: currentTask.id, unic: comment.unic }),
    })
    // await updateDoc(commentDoc, {
    //   tasks: arrayUnion({ title: editInp, id: currentTask.id }),
    // })
    // // dispatch(setCommentTitle(editInp))
    // setIsEditCommentOpen(false)
    // setEditInp('')
  }
  const openDescription = () => {
    setIsEditCommentOpen(true)
    setEditInp(comment.title)
  }

  const handleClick = () => null
  return (
    <Grid container>
      <Grid item xs={4} md={1} display={'flex'} alignItems={'center'}>
        <UserCircle handleClick={handleClick} size={35} />
      </Grid>
      <Grid item xs={8} md={11} display={'flex'} alignItems={'center'}>
        {!isEditCommentOpen ? (
          <Card onClick={openDescription} sx={{ height: '40px', width: '100%', display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
            <Typography p={2}>{comment.title}</Typography>
          </Card>
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
