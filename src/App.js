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
import { arrayUnion, doc, updateDoc } from 'firebase/firestore'
import { generalBoardCollection } from 'firebase-client'

// TODO change /home/:dashboard to /home/:dashboardName

function App() {
  const dashboardId = useSelector(currentDashboardIdState)

  const [finalColumn, setFinalColumn] = useState(null)

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

    const sourceDoc = doc(generalBoardCollection, `${dashboardId}`, 'cards', sourceColumn.id)
    // if user drops within the same column
    if (sourceColumnName === destinationColumnName) {
      const newColumn = reorderColumnList(sourceColumn, source.index, destination.index)

      await updateDoc(sourceDoc, {
        tasks: newColumn.tasks,
      })
      // if user drops from one column to another
    } else {
      const destinationDoc = doc(generalBoardCollection, `${dashboardId}`, 'cards', destinationColumn.id)

      const sourceColumnTasks = Array.from(sourceColumn.tasks)
      const [removedTask] = sourceColumnTasks.splice(source.index, 1)

      const removedDescription = sourceColumn.descriptions
        ? sourceColumn.descriptions.filter((desc) => desc.id === removedTask.id).pop()
        : null

      const removedComments = sourceColumn.comments
        ? sourceColumn.comments.filter((comment) => comment.id === removedTask.id)
        : null
      const restComments = sourceColumn.comments
        ? sourceColumn.comments.filter((comment) => comment.id !== removedTask.id)
        : null
      await updateDoc(sourceDoc, {
        tasks: sourceColumnTasks,
        comments: restComments,
      })

      let destinationColumnTasks = destinationColumn.tasks ? Array.from(destinationColumn.tasks) : []

      destinationColumnTasks.length >= 1
        ? destinationColumnTasks.splice(destination.index, 0, removedTask)
        : (destinationColumnTasks = [removedTask])

      await updateDoc(destinationDoc, {
        tasks: destinationColumnTasks,
      })
      removedDescription &&
        (await updateDoc(destinationDoc, {
          descriptions: arrayUnion(removedDescription),
        }))

      removedComments &&
        destinationColumn.comments &&
        (await updateDoc(destinationDoc, {
          comments: destinationColumn.comments.concat(removedComments),
        }))
      removedComments &&
        !destinationColumn.comments &&
        (await updateDoc(destinationDoc, {
          comments: removedComments,
        }))
    }
  }
  const onDragStart = () => {
    setFinalColumn(finalColumn)
  }
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
        </Routes>
      </GetState>
    </DragDropContext>
  )
}

export default App
