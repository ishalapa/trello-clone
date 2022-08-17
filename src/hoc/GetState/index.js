import { usersCollection } from 'firebase-client'
import { collection, onSnapshot } from 'firebase/firestore'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setBoardCards } from 'store/slices/boardCardsSlice'
import { currentDashboardIdState } from 'store/slices/currentDashboardSlice'
import { currentUserStateId } from 'store/slices/currentUserSlice'
import { setDashboards } from 'store/slices/dashboardsSlice'
import { setUsers } from 'store/slices/usersSlice'

const GetState = ({ children }) => {
  const dispatch = useDispatch()
  const dashboardId = useSelector(currentDashboardIdState)
  const userId = useSelector(currentUserStateId)

  const dashboardCollection = collection(usersCollection, `${userId}`, "dashboards")
  const cardsCollection = collection(dashboardCollection, `${dashboardId}`, "cards")

  useEffect(() => {
    onSnapshot(usersCollection, (snapshot) => {
      const usersSnap = snapshot.docs.map((doc) => {
        return { ...doc.data(), id: doc.id }
      })
      dispatch(setUsers(usersSnap))
    })
  }, [])

  useEffect(() => {
    onSnapshot(dashboardCollection, (snapshot) => {
      const dashboardSnap = snapshot.docs.map((doc) => {
        return { ...doc.data(), id: doc.id }
      })
      dispatch(setDashboards(dashboardSnap))
    })
  }, [dashboardCollection])
 
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
