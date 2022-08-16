import React from 'react'

import { Stack } from '@mui/material'
import { useSelector } from 'react-redux'
import { tasksState } from 'store/slices/tasksSlice'
import Task from './Task/Task'

const Tasks = () => {
  const tasks = useSelector(tasksState)
  return (
    <Stack spacing={1}>
      {tasks && tasks.map((task) => <Task key={task.id} task={task} />)}
      dsadsa
    </Stack>
  )
}

export default Tasks
