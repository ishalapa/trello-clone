import { configureStore } from '@reduxjs/toolkit'

import dashboardReducer from "./slices/dashboardSlice"
import dashboardsReducer from "./slices/dashboardsSlice"
import currentDashboardReducer from "./slices/currentDashboardSlice"
import boardCardsReducer from "./slices/boardCardsSlice"
import tasksReducer from "./slices/tasksSlice"
import currentUserReducer from "./slices/currentUserSlice"
import usersReducer from "./slices/usersSlice"
import currentTaskReducer from "./slices/currentTaskSlice"

export const store = configureStore({
    reducer: {
        dashboard: dashboardReducer,
        dashboards: dashboardsReducer,
        currentDashboard: currentDashboardReducer,
        boardCards: boardCardsReducer,
        tasks: tasksReducer,
        currentUser: currentUserReducer,
        users: usersReducer,
        currentTask: currentTaskReducer
    }
})