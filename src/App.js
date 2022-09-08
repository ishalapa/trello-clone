import { useContext } from 'react'

import GetState from 'hoc/GetState'
import DashboardListPage from 'pages/DashboardListPage'
import HomePage from 'pages/HomePage'
import { Route, Routes } from 'react-router-dom'
import Layout from 'ui/Layout'

import './App.css'
import DashboardPage from 'pages/DashboardPage'

import { DragDropContext } from 'react-beautiful-dnd'
import SignUp from 'pages/SignUp'

import NotFound from 'pages/NotFaund'
import GeneralContext from 'context/GeneralContext'

function App() {

  console.log("rerender App")
  const {onDragStart, onDragEnd} = useContext(GeneralContext)
  return (
    <DragDropContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
      <GetState>
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignUp />} />
          <Route path="/" element={<Layout />}>
            <Route path="/home" element={<DashboardListPage />} />
            <Route path={`/home/:dashboardName`} element={<DashboardPage />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </GetState>
    </DragDropContext>
  )
}

export default App
