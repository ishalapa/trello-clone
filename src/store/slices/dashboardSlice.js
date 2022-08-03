import {createSlice} from "@reduxjs/toolkit"


const initialState = {
    dashboard: false
}
const dashboardSlice = createSlice({
    name: "dashboard",
    initialState,
    reducers: {
        openDashboardForm: (state, action) => {
            state.dashboard = action.payload
        }
    }
})

export const { openDashboardForm } = dashboardSlice.actions

export const dashboardState = state => state.dashboard.dashboard

export default dashboardSlice.reducer