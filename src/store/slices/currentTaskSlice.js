import {createSlice} from "@reduxjs/toolkit"


const initialState = {
    currentTask: {
        title: "", 
        id: null
    }
}
const currentTaskSlice = createSlice({
    name: "currentTask",
    initialState,
    reducers: {
        setCurrentTaskTitle: (state, action) => {
            state.currentTask.title = action.payload
        },
        setCurrentTaskId: (state, action) => {
            state.currentTask.id = action.payload
        }
    }
})

export const { setCurrentTaskTitle, setCurrentTaskId } = currentTaskSlice.actions

export const currentTaskState = state => state.currentTask.currentTask

export default currentTaskSlice.reducer