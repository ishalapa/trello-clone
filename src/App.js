import GetState from 'hoc/GetState'
import DashboardListPage from 'pages/DashboardListPage'
import HomePage from 'pages/HomePage'
import { Route, Routes } from 'react-router-dom'
import Layout from 'ui/Layout'

import './App.css'
import DashboardPage from 'pages/DashboardPage'

import { DragDropContext } from "react-beautiful-dnd"
import SignUp from 'pages/SignUp'

function App() {
  const onDragEnd = (result) => {
    const { source, destination } = result

    if (!destination) return

    if (destination.droppableId === source.droppableId && destination.index === source.index) return

    console.log(result)
  }
  return (
    <GetState>
      <DragDropContext onDragEnd={onDragEnd}>
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignUp />} />
          <Route path="/" element={<Layout />}>
            <Route path="/home" element={<DashboardListPage />} />
            <Route path={`/home/:dashboardName`} element={<DashboardPage />} />
          </Route>
        </Routes>
      </DragDropContext>
    </GetState>
  )
}

export default App
