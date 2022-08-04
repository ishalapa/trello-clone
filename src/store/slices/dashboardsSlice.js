import {createSlice} from "@reduxjs/toolkit"


const initialState = {
    dashboards: null
}
const dashboardsSlice = createSlice({
    name: "dashboards",
    initialState,
    reducers: {
        setDashboards: (state, action) => {
            state.dashboards = action.payload
        }
    }
})

export const { setDashboards } = dashboardsSlice.actions

export const dashboardsState = state => state.dashboards.dashboards

export default dashboardsSlice.reducer