import React, { useState, useEffect } from 'react'

import { Grid, Card, Box, Typography, TextField, Stack, Button } from '@mui/material'
import { useSelector } from 'react-redux'
import { currentUserStateId, currentUserStateName } from 'store/slices/currentUserSlice'
import UserCircle from 'ui/UserCircle'
import { arrayUnion, collection, doc, updateDoc } from 'firebase/firestore'
import { usersCollection } from 'firebase-client'
import { currentDashboardIdState } from 'store/slices/currentDashboardSlice'
import { currentTaskState } from 'store/slices/currentTaskSlice'

const CommentWrite = ({card}) => {
  const [iconName, setIconName] = useState('')
  const [inp, setInp] = useState('')
  const [isCommentClicked, setIsCommentClicked] = useState(false)

  const userId = useSelector(currentUserStateId)
  const dashboardId = useSelector(currentDashboardIdState)
  const userName = useSelector(currentUserStateName)
  const currentTask = useSelector(currentTaskState)

  const dashCollection = collection(usersCollection, `${userId}`, 'dashboards')
  const tasksDoc = doc(dashCollection, `${dashboardId}`, 'cards', card.id)

  useEffect(() => {
    if (userName) {
      setIconName(userName.split(' ')[0].slice(0, 1) + userName.split(' ')[1].slice(0, 1))
    } else setIconName('')
  }, [userName])

  const genNumKey = (key) => {
    return key + new Date().getTime()
  }

  const addComment = async (e) => {
    e.preventDefault()
    await updateDoc(tasksDoc, {
      comments: arrayUnion({ title: inp, id: currentTask.id, unic: genNumKey(currentTask.id) }),
    })
    setIsCommentClicked(false)
    setInp('')
  }
  const handleClick = () => null
  return (
    <Grid container>
      <Grid item xs={4} md={1} display={"flex"} alignItems={"center"}>
        <UserCircle handleClick={handleClick} size={35}/>
      </Grid>
      <Grid item xs={8} md={11} display={'flex'} alignItems={'center'} justifyContent={'end'}>
        {!isCommentClicked ? (
          <Card
            onClick={() => setIsCommentClicked(true)}
            sx={{ height: '40px', width: '100%', display: 'flex', alignItems: 'center', cursor: 'pointer' }}
          >
            <Typography color={'#595959'} p={2}>
              Write a comment...
            </Typography>
          </Card>
        ) : (
          <Box width={"100%"} pt={1}>
            <TextField
              value={inp}
              onChange={(e) => setInp(e.target.value)}
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
