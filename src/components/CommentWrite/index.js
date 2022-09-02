import React, { useState } from 'react'

import { Grid, Card, Box, Typography, TextField, Stack, Button } from '@mui/material'
import { useSelector } from 'react-redux'
import UserCircle from 'ui/UserCircle'
import { arrayUnion, doc, updateDoc } from 'firebase/firestore'
import { currentDashboardIdState } from 'store/slices/dashboardsSlice'
import { currentTaskState } from 'store/slices/tasksSlice'
import { generalBoardCollection } from 'firebase-client'

const CommentWrite = ({card}) => {
  const dashboardId = useSelector(currentDashboardIdState)
  const currentTask = useSelector(currentTaskState)

  const [commentText, setCommentText] = useState('')
  const [isEditCommentOpen, setIsEditCommentOpen] = useState(false)

  const tasksDoc = doc(generalBoardCollection, `${dashboardId}`, 'cards', card.id)

  const genNumKey = (key) => {
    return key + new Date().getTime()
  }

  const addComment = async (e) => {
    e.preventDefault()
    await updateDoc(tasksDoc, {
      comments: arrayUnion({ title: commentText, id: currentTask.id, unic: genNumKey(currentTask.id) }),
    })
    setIsEditCommentOpen(false)
    setCommentText('')
  }

  const handleClick = () => null

  return (
    <Grid container>
      <Grid item xs={4} md={1} display={"flex"} alignItems={"center"}>
        <UserCircle handleClick={handleClick} size={35}/>
      </Grid>
      <Grid item xs={8} md={11} display={'flex'} alignItems={'center'} justifyContent={'end'}>
        {!isEditCommentOpen ? (
          <Card
            onClick={() => setIsEditCommentOpen(true)}
            sx={{ height: '40px', width: '100%', display: 'flex', alignItems: 'center', cursor: 'pointer' }}
          >
            <Typography color={'#595959'} p={2}>
              Write a comment...
            </Typography>
          </Card>
        ) : (
          <Box width={"100%"} pt={1}>
            <TextField
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
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
              <Button onClick={addComment} variant="contained">
                Save
              </Button>
            </Stack>
          </Box>
        )}
      </Grid>
    </Grid>
  )
}

export default CommentWrite
