import { configureStore } from '@reduxjs/toolkit'

import dashboardReducer from "./slices/dashboardSlice"
import dashboardsReducer from "./slices/dashboardsSlice"
import currentDashboardReducer from "./slices/currentDashboardSlice"

export const store = configureStore({
    reducer: {
        dashboard: dashboardReducer,
        dashboards: dashboardsReducer,
        currentDashboard: currentDashboardReducer
    }
})