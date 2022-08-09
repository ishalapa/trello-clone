import React from 'react'

import { Card, Typography } from '@mui/material'
import { Draggable } from 'react-beautiful-dnd'

const Task = ({ task, index }) => {
  return (
    <Draggable draggableId={task.id.toString()} index={index}>
      {(provided) => (
        <Card
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          sx={{ boxShadow: 1, display: 'flex', alignItems: 'center', cursor: 'pointer' }}
          color="#000066"
        >
          <Typography p={1} variant="subtitle1" color="#000066">
            {task.title}
          </Typography>
        </Card>
      )}
    </Draggable>
  )
}

export default Task
