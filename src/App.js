import { useState } from 'react'
import GetState from 'hoc/GetState'
import DashboardListPage from 'pages/DashboardListPage'
import HomePage from 'pages/HomePage'
import { Route, Routes } from 'react-router-dom'
import Layout from 'ui/Layout'

import './App.css'
import DashboardPage from 'pages/DashboardPage'

import { DragDropContext } from 'react-beautiful-dnd'
import SignUp from 'pages/SignUp'
import { useSelector } from 'react-redux'
import { boardCardsState, currentDashboardIdState } from 'store/slices/dashboardsSlice'
import { collection, doc, updateDoc } from 'firebase/firestore'
import { usersCollection } from 'firebase-client'
import { currentUserStateId } from 'store/slices/usersSlice'

function App() {
  const userId = useSelector(currentUserStateId)
  const dashboardId = useSelector(currentDashboardIdState)

  const [finalColumn, setFinalColumn] = useState(null)

  const dashboardCollection = collection(usersCollection, `${userId}`, 'dashboards')
  const boardCardColumns = useSelector(boardCardsState)

  const reorderColumnList = (sourceColumn, startIndex, endIndex) => {
    const newTasks = Array.from(sourceColumn.tasks)
    const [removed] = newTasks.splice(startIndex, 1)
    newTasks.splice(endIndex, 0, removed)

    const newColumn = {
      ...sourceColumn,
      tasks: newTasks,
    }
    return newColumn
  }

  const onDragEnd = async (result) => {
    const { source, destination } = result

    if (!destination) return

    if (destination.droppableId === source.droppableId && destination.index === source.index) return
    const sourceColumnName = source.droppableId
    const destinationColumnName = destination.droppableId

    const sourceColumnArr = boardCardColumns.filter((column) => (column.title === sourceColumnName ? column : null))
    const desctinationColumnArr = boardCardColumns.filter((column) =>
      column.title === destinationColumnName ? column : null
    )
    const sourceColumn = sourceColumnArr[0]
    const destinationColumn = desctinationColumnArr[0]
    const tasksDoc = doc(dashboardCollection, `${dashboardId}`, 'cards', sourceColumn.id)
    // if user drops within the same column
    if (sourceColumnName === destinationColumnName) {
      const newColumn = reorderColumnList(sourceColumn, source.index, destination.index)

      await updateDoc(tasksDoc, {
        tasks: newColumn.tasks,
      })
      // if user drops from one column to another
    } else {
      const newTSourceColumnTasks = Array.from(sourceColumn.tasks)
      const [removed] = newTSourceColumnTasks.splice(source.index, 1)

      const newSourceColumn = {
        ...sourceColumn,
        tasks: newTSourceColumnTasks,
      }
      await updateDoc(tasksDoc, {
        tasks: newSourceColumn.tasks,
      })

      const destinationColumnTasks = Array.from(destination.tasks)
      destinationColumnTasks.splice(destination.index, 0, removed)

      const newDestinationColumn = {
        ...destinationColumn,
        tasks: destinationColumnTasks
      }
      await updateDoc(tasksDoc, {
        tasks: newDestinationColumn.tasks,
      })
    }
  }
  const onDragStart = () => {
    setFinalColumn(finalColumn)
  }
  return (
    <GetState>
      <DragDropContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
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
