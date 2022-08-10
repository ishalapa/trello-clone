import GetState from 'hoc/GetState'
import Dashboards from 'components/Dashboards'
import Home from 'pages/Home'
import Start from 'pages/Start'
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
          <Route index element={<Start />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/" element={<Layout />}>
            <Route path="/home" element={<Home />} />
            <Route path={`/home/:dashboard`} element={<DashboardPage />} />
            <Route path="/dashboard" element={<Dashboards />} />
          </Route>
        </Routes>
      </DragDropContext>
    </GetState>
  )
}

export default App
