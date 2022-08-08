const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
    tasks: null
}
const tasksSlice = createSlice({
    name: "tasks",
    initialState,
    reducers: {
        setTasks: (state, action) => {
            state.tasks = action.payload
        }
    }
})

export const {setTasks} = tasksSlice.actions

export const tasksState = (state) => state.tasks.tasks

export default tasksSlice.reducer