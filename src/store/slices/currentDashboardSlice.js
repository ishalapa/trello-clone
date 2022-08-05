import {createSlice} from "@reduxjs/toolkit"


const initialState = {
    currentDashboard: {
        data: null,
        id: null
    }
}
const currentDashboardSlice = createSlice({
    name: "currentDashboard",
    initialState,
    reducers: {
        setCurrentDashboard: (state, action) => {
            state.currentDashboard.data = action.payload
        },
        setCurrentDashboardId: (state, action) => {
            state.currentDashboard.id = action.payload
        }
    }
})

export const { setCurrentDashboard, setCurrentDashboardId } = currentDashboardSlice.actions

export const currentDashboardState = state => state.currentDashboard.currentDashboard.data
export const currentDashboardIdState = state => state.currentDashboard.currentDashboard.id

export default currentDashboardSlice.reducer