import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  dashboards: {
    list: null,
    boardCards: null,
  },
  currentDashboard: {
    title: '',
    id: null,
    members: [],
  },
}
const dashboardsSlice = createSlice({
  name: 'dashboards',
  initialState,
  reducers: {
    setDashboards: (state, action) => {
      state.dashboards.list = action.payload
    },
    setBoardCards: (state, action) => {
      state.dashboards.boardCards = action.payload
    },
    setCurrentDashboard: (state, action) => {
      state.currentDashboard = action.payload
    },
  },
})

export const { setDashboards, setBoardCards, setCurrentDashboard } = dashboardsSlice.actions

export const dashboardsState = (state) => state.dashboards.dashboards.list
export const dashboardState = (state) => state.dashboards.dashboard
export const boardCardsState = (state) => state.dashboards.dashboards.boardCards

export const currentDashboardState = (state) => state.dashboards.currentDashboard
export const currentDashboardIdState = (state) => state.dashboards.currentDashboard.id

export default dashboardsSlice.reducer
