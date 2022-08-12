import {createSlice} from "@reduxjs/toolkit"


const initialState = {
    currentTask: null
}
const currentTaskSlice = createSlice({
    name: "currentTask",
    initialState,
    reducers: {
        setCurrentTask: (state, action) => {
            state.currentTask = action.payload
        }
    }
})

export const { setCurrentTask } = currentTaskSlice.actions

export const currentTaskState = state => state.currentTask.currentTask

export default currentTaskSlice.reducer