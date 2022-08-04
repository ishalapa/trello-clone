import { configureStore } from '@reduxjs/toolkit'

import dashboardReducer from "./slices/dashboardSlice"
import dashboardsReducer from "./slices/dashboardsSlice"

export const store = configureStore({
    reducer: {
        dashboard: dashboardReducer,
        dashboards: dashboardsReducer
    }
})