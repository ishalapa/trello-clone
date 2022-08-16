import React from 'react'

import { Card, Typography, IconButton } from '@mui/material'
import { Draggable } from 'react-beautiful-dnd'

import { RiPencilLine } from 'react-icons/ri'
import { useDispatch } from 'react-redux'
import { setCurrentTask } from 'store/slices/currentTaskSlice'

const Task = ({ task, index, handleOpen }) => {
  const dispatch = useDispatch()

  // TODO change to openTaskDetailsModal
  const handleOpenDispatch = () => {
    dispatch(setCurrentTask(task))
    handleOpen()
  }
  return (
    <Draggable draggableId={task.id.toString()} index={index}>
      {(provided) => (
        <Card
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          sx={{ boxShadow: 1, display: 'flex', alignItems: 'center', cursor: 'pointer', position: 'relative' }}
          color="#000066"
        >
          <IconButton onClick={handleOpenDispatch} size="small" sx={{ position: 'absolute', right: 5 }}>
            <RiPencilLine />
          </IconButton>
          <Typography p={1} variant="subtitle1" color="#000066">
            {task.title}
          </Typography>
        </Card>
      )}
    </Draggable>
  )
}

export default Task
