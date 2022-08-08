import { dashboardsCollection } from 'firebase-client'
import { collection, onSnapshot } from 'firebase/firestore'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setBoardCards } from 'store/slices/boardCardsSlice'
import { currentDashboardIdState } from 'store/slices/currentDashboardSlice'
import { setDashboards } from 'store/slices/dashboardsSlice'
import { tasksState } from 'store/slices/tasksSlice'

const GetState = ({ children }) => {
  const dispatch = useDispatch()
  const dashboardId = useSelector(currentDashboardIdState)
  // const tasks = useSelector(tasksState)
  // const tasksCollection = collection()
  const cardsCollection = collection(dashboardsCollection, `${dashboardId}`, "cards")

  useEffect(() => {
    onSnapshot(dashboardsCollection, (snapshot) => {
      const dashboardSnap = snapshot.docs.map((doc) => {
        return { ...doc.data(), id: doc.id }
      })
      dispatch(setDashboards(dashboardSnap))
    })
  }, [])
  console.log()
  useEffect(() => {
    onSnapshot(cardsCollection, (snapshot) => {
      const cardSnap = snapshot.docs.map((doc) => {
        return { ...doc.data(), id: doc.id }
      })
      dispatch(setBoardCards(cardSnap))
    })
  }, [dashboardId])

  return children
}

export default GetState
