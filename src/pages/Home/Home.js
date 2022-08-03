import React from 'react'

import { useSelector } from 'react-redux'

import "assets/scss/Home.scss"
import AddBoardForm from 'ui/AddBoardForm'
import { dashboardState } from 'store/slices/dashboardSlice'

const Home = () => {
  // const isDashOpen = useSelector(dashboardState)
  return (
    <div>
      {/* {isDashOpen && <AddBoardForm />} */}
      {/* <AddBoardForm /> */}
    </div>
  )
}

export default Home