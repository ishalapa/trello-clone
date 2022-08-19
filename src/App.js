import{useState} from "react"
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
import { boardCardsState } from 'store/slices/dashboardsSlice'

// TODO change /home/:dashboard to /home/:dashboardName

function App() {
  const boardCardColumns = useSelector(boardCardsState)
  const [colums, setColums] = useState(boardCardColumns)
  const onDragEnd = (result) => {
    const { source, destination } = result

    if (!destination) return

    if (destination.droppableId === source.droppableId && destination.index === source.index) return
    const sourceCol = source.droppableId
    const destinationCol = destination.droppableId

    if (sourceCol === destinationCol){
      const currentColumn = boardCardColumns.filter(column => column.title === sourceCol ? column : null)
      const fromColumn = currentColumn[0]

      const reorderColumnList = (fromColumn, startIndex, endIndex) => {
        const newTaskIds = Array.from(fromColumn.taskIds)
        const [removed] = newTaskIds.splice(startIndex, 1)
        newTaskIds.splice(endIndex, 0, removed)

        const newColumn = {
          ...fromColumn,
          taskIds: newTaskIds
        }
        return newColumn
      }
      const newColumn = reorderColumnList(fromColumn, source.index, destination.index)
      
      const newObj = newColumn.taskIds.map(id => newColumn.tasks.filter(task => id === task.index))

      const newestColumn = {
        ...newColumn,
        tasks: [...newObj]
      }

      const currentCard = boardCardColumns.filter(card => card.id === newObj.id)
      console.log(newObj)
    }
    
  }

  // const greatObj = {
  //   tasks: [
  //     { title: '11', id: 1660742682353, index: 1 },
  //     { title: '33', id: 1660742684985, index: 3 },
  //     { index: 2, id: 1660742683586, title: '22' }
      
  //   ],
  //   ids: [1, 3, 2]
  // }
  // const newObj = greatObj.ids.map(id => greatObj.tasks.filter(task => id === task.index))
  // console.log(newObj)
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
