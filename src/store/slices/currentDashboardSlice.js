import {createSlice} from "@reduxjs/toolkit"


const initialState = {
    currentDashboard: null
}
const currentDashboardSlice = createSlice({
    name: "currentDashboard",
    initialState,
    reducers: {
        setCurrentDashboard: (state, action) => {
            state.currentDashboard = action.payload
        }
    }
})

export const { setCurrentDashboard } = currentDashboardSlice.actions

export const currentDashboardState = state => state.currentDashboard.currentDashboard

export default currentDashboardSlice.reducer