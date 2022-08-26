import { usersCollection } from 'firebase-client'
import { collection, onSnapshot, query, where } from 'firebase/firestore'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { dashboardsState, setBoardCards } from 'store/slices/dashboardsSlice'
import { currentDashboardIdState } from 'store/slices/dashboardsSlice'
import { currentUserStateId } from 'store/slices/usersSlice'
import { setDashboards } from 'store/slices/dashboardsSlice'
import { setUsers } from 'store/slices/usersSlice'
import { generalBoardCollection } from 'firebase-client'

const GetState = ({ children }) => {
  const dispatch = useDispatch()
  const dashboardId = useSelector(currentDashboardIdState)
  const userId = useSelector(currentUserStateId)
  const dashboardList = useSelector(dashboardsState)
  // const dashboardCollection = collection(usersCollection, `${userId}`, "dashboards")
  const qGeneralBoardCollection = query(generalBoardCollection, where("members", "array-contains", `${userId}`))
  const cardsCollection = collection(generalBoardCollection, `${dashboardId}`, "cards")
  
  console.log(qGeneralBoardCollection)
  useEffect(() => {
    onSnapshot(usersCollection, (snapshot) => {
      const usersSnap = snapshot.docs.map((doc) => {
        return { ...doc.data(), id: doc.id }
      })
      dispatch(setUsers(usersSnap))
    })
  }, [])

  useEffect(() => {
    onSnapshot(qGeneralBoardCollection, (snapshot) => {
      const dashboardSnap = snapshot.docs.map((doc) => {
        return { ...doc.data(), id: doc.id }
      })
      dispatch(setDashboards(dashboardSnap))
    })
  }, [userId])
 
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
