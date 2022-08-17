import { configureStore } from '@reduxjs/toolkit'

import dashboardsReducer from "./slices/dashboardsSlice"
import tasksReducer from "./slices/tasksSlice"
import usersReducer from "./slices/usersSlice"
import descriptionReducer from "./slices/descriptionSlice"
import commentReducer from "./slices/commentSlice"

export const store = configureStore({
    reducer: {
        dashboards: dashboardsReducer,
        tasks: tasksReducer,
        users: usersReducer,
        description: descriptionReducer,
        comment: commentReducer
    }
})