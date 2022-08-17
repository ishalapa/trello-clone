import React from 'react'

import { Stack } from '@mui/material'

import Comment from './Comment/Comment'
import { useSelector } from 'react-redux'
import { currentTaskState } from 'store/slices/currentTaskSlice'

const Comments = ({card}) => {
    const currentTask = useSelector(currentTaskState)

    const genNumKey = (key) => {
        return key + new Date().getTime()
      }
    console.log(card.comments)
  return (
    <Stack spacing={2}>
    {card.comments && currentTask.title && card.comments.map((comment, index) => {
        if (comment.id === currentTask.id) {
        return (<Comment card={card} key={genNumKey(index)} comment={comment} />)
        }
    })}
  </Stack>
  )
}

export default Comments