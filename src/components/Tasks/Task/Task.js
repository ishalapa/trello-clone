import React from 'react'

import { Card, Typography, Box, Stack } from '@mui/material'
import { Draggable } from 'react-beautiful-dnd'

import { RiPencilLine } from 'react-icons/ri'
import { MdOutlineDescription, MdOutlineModeComment } from 'react-icons/md'
import { useDispatch } from 'react-redux'
import { setCurrentTaskId, setCurrentTaskTitle } from 'store/slices/currentTaskSlice'

const Task = ({ card, task, index, handleOpen }) => {
  const dispatch = useDispatch()

  const handleOpenDispatch = () => {
    dispatch(setCurrentTaskTitle(task.title))
    dispatch(setCurrentTaskId(task.id))
    handleOpen()
  }

  const isCommentExist = card.comments && card.comments.find((comment) => (comment.id === task.id && comment.title ? true : false))
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
          <Stack direction="column">
            <Box>
              <Box
                onClick={handleOpenDispatch}
                display="flex"
                justifyContent={'center'}
                alignItems={'center'}
                sx={{
                  position: 'absolute',
                  right: 2,
                  top: 2,
                  width: '36px',
                  height: '36px',
                  borderRadius: '2px',
                  '&:hover': { backgroundColor: '#e6e6e6', color: 'black' },
                }}
              >
                <RiPencilLine size={16} color="#666666" />
              </Box>
              <Typography p={1} variant="subtitle1" color="#000066">
                {task.title}
              </Typography>
            </Box>
            <Box>
              <Stack spacing={1} direction={'row'} sx={{ position: 'relative', left: 5 }}>
                {card.descriptions &&
                  card.descriptions.map((desc, index) => {
                    if (desc.id === task.id && desc.title) {
                      return (
                        <MdOutlineDescription key={index} style={{ marginBottom: '8px' }} size={16} color="#666666" />
                      )
                    }
                  })}
                {isCommentExist && (
                  <MdOutlineModeComment key={index} style={{ marginBottom: '8px' }} size={16} color="#666666" />
                )}
              </Stack>
            </Box>
          </Stack>
        </Card>
      )}
    </Draggable>
  )
}

export default Task
