import React from 'react'
import { useSelector } from 'react-redux'
import { currentDashboardState } from 'store/slices/currentDashboardSlice'

const DashboardPage = () => {
    const currentDashboard = useSelector(currentDashboardState)
  return (
    <div>
        {currentDashboard.title}
    </div>
  )
}

export default DashboardPage