import { combineReducers, configureStore } from '@reduxjs/toolkit'

import dashboardsReducer from './slices/dashboardsSlice'
import tasksReducer from './slices/tasksSlice'
import usersReducer from './slices/usersSlice'
import descriptionReducer from './slices/descriptionSlice'
import commentReducer from './slices/commentSlice'

import storage from 'redux-persist/lib/storage'
import persistReducer from 'redux-persist/es/persistReducer'
import thunk from 'redux-thunk'
import persistStore from 'redux-persist/es/persistStore'

const persistConfig = {
  key: 'root',
  storage,
}

const reducers = combineReducers({
  dashboards: dashboardsReducer,
  tasks: tasksReducer,
  users: usersReducer,
  description: descriptionReducer,
  comment: commentReducer,
})

const persistedReducer = persistReducer(persistConfig, reducers)

export const store = configureStore({
    reducer: persistedReducer,
    devTools: process.env.NODE_ENV !== 'production',
    middleware: [thunk],
  })
  
  export const persistor = persistStore(store)
