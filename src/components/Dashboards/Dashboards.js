import React from 'react'
import { useSelector } from 'react-redux'
import { dashboardsState } from 'store/slices/dashboardsSlice'

import Dashboard from './Dashboard/Dashboard'

const Dashboards = () => {
  const dashboards = useSelector(dashboardsState)
  return (
    <>
      {dashboards.map(board => (
        <Dashboard key={board.id} board={board}/>
      ))}
    </>
  )
}

export default Dashboards