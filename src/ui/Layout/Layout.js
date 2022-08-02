import TopBar from 'layout/TopBar'
import React from 'react'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <>
        <TopBar />
        <Outlet />
    </>
  )
}

export default Layout