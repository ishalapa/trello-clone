import React, { useState } from 'react'

import { CardContent, Typography, Button, Card, TextField, Box, Stack, IconButton, Alert } from '@mui/material'
import { AiOutlinePlus, AiOutlineClose } from 'react-icons/ai'
import { useSelector } from 'react-redux'
import { arrayUnion, doc, updateDoc } from 'firebase/firestore'
import { currentDashboardIdState } from 'store/slices/dashboardsSlice'
import { Droppable } from 'react-beautiful-dnd'
import Task from 'components/Task'
import TaskDescription from 'components/TaskDescription'
import { useDispatch } from 'react-redux'
import { setDescriptionTitle } from 'store/slices/descriptionSlice'
import DeletePopover from 'components/DeleteListPopover'
import { generalBoardCollection } from 'firebase-client'

const BoardCard = ({ card }) => {
  const dispatch = useDispatch()
  const [isNewTaskInputOpen, setIsNewTaskInputOpen] = useState(false)
  const [isDescriptionModalOpen, setIsDescriptionModalOpen] = useState(false)
  const [isValid, setIsValid] = useState(true)

  const [isBoardcardTitleEditOpen, setIsBoardcardTitleEditOpen] = useState(false)
  const [boardCardTitle, setBoardCardTitle] = useState(card.title ?  card.title : '')

  const openDescriptionModal = () => setIsDescriptionModalOpen(true)

  const closeDescriptionModal = (setInput, setIsDescOpen) => {
    setIsDescriptionModalOpen(false)
    setInput('')
    dispatch(setDescriptionTitle(''))
    setIsDescOpen(false)
  }

  const [cardTitle, setCardTitle] = useState('')

  const dashboardId = useSelector(currentDashboardIdState)
  const tasksDoc = doc(generalBoardCollection, `${dashboardId}`, 'cards', card.id)

  const genNumKey = (key) => {
    return key + new Date().getTime()
  }

  const addTask = async (e) => {
    e.preventDefault()

    if (!cardTitle.trim()) {
      setIsValid(false)
    } else {
      setIsValid(true)
      await updateDoc(tasksDoc, {
        tasks: arrayUnion({ title: cardTitle, id: genNumKey(1) }),
      })
      setCardTitle('')
    }
  }
 
  const updateDashboardTitle = async (e) => {
    e.preventDefault()

    updateDoc(tasksDoc, {
      title: boardCardTitle,
    })
    setIsBoardcardTitleEditOpen(false)
  }
  return (
    <Droppable droppableId={card.title}>
      {(provided) => (
        <Card ref={provided.innerRef} {...provided.droppableProps} sx={{ width: '290px', backgroundColor: '#f0f0f5' }}>
          <CardContent>
            <Box display={'flex'} flexDirection={'row'} justifyContent="space-between">
              {!isBoardcardTitleEditOpen ? (
                <Typography
                  onClick={() => setIsBoardcardTitleEditOpen(true)}
                  variant="h6"
                  color="#000066"
                  sx={{ cursor: 'pointer' }}
                >
                  {card.title}
                </Typography>
              ) : (
                <form action="" onSubmit={(e) => updateDashboardTitle(e)}>
                  <TextField
                    value={boardCardTitle}
                    onChange={(e) => setBoardCardTitle(e.target.value)}
                    sx={{ backgroundColor: 'white' }}
                    size="small"
                    variant="outlined"
                  />
                </form>
              )}
              <DeletePopover title={card.title} card={card} />
            </Box>
            <Stack pt={1} spacing={1}>
              {card.tasks &&
                card.tasks.map((task, index) => (
                  <Task
                    card={card}
                    key={task.id}
                    task={task}
                    index={index}
                    openDescriptionModal={openDescriptionModal}
                  />
                ))}
            </Stack>
            {!isNewTaskInputOpen ? (
              <Button
                onClick={() => setIsNewTaskInputOpen(true)}
                startIcon={<AiOutlinePlus />}
                fullWidth
                variant="text"
                sx={{ justifyContent: 'flex-start', marginTop: '5px', '&:hover': { backgroundColor: '#e6e6e6' } }}
              >
                Add card
              </Button>
            ) : (
              <Box pt={1}>
                <form action="" onSubmit={addTask}>
                  <TextField
                    required
                    value={cardTitle}
                    onChange={(e) => setCardTitle(e.target.value)}
                    sx={{ backgroundColor: 'white' }}
                    size="small"
                    variant="outlined"
                    multiline
                    minRows={1}
                    maxRows={5}
                    placeholder="Enter a title for this task"
                    fullWidth
                  />
                  {!isValid && (
                    <Alert sx={{ mt: '3px' }} severity="warning">
                      Try another title
                    </Alert>
                  )}
                  <Stack pt={1} spacing={1} direction="row" alignItems="center">
                    <Button type="submit" variant="contained">
                      Add card
                    </Button>
                    <IconButton onClick={() => setIsNewTaskInputOpen(false)} size="small">
                      <AiOutlineClose />
                    </IconButton>
                  </Stack>
                </form>
              </Box>
            )}
            <TaskDescription
              isDescriptionModalOpen={isDescriptionModalOpen}
              closeDescriptionModal={closeDescriptionModal}
              card={card}
            />
          </CardContent>
          {provided.placeholder}
        </Card>
      )}
    </Droppable>
  )
}

export default BoardCard
