const { createSlice } = require('@reduxjs/toolkit')

const initialState = {
  tasks: {
    list: null,
    currentTask: { title: '', id: null },
  },
}
const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setTasks: (state, action) => {
      state.tasks = action.payload
    },
    setCurrentTaskTitle: (state, action) => {
      state.tasks.currentTask.title = action.payload
    },
    setCurrentTaskId: (state, action) => {
      state.tasks.currentTask.id = action.payload
    },
  },
})

export const { setTasks, setCurrentTaskTitle, setCurrentTaskId } = tasksSlice.actions

export const tasksState = (state) => state.tasks.tasks.list
export const currentTaskState = state => state.tasks.tasks.currentTask

export default tasksSlice.reducer
