import { usersCollection } from 'firebase-client'
import { collection, onSnapshot } from 'firebase/firestore'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setBoardCards } from 'store/slices/dashboardsSlice'
import { currentDashboardIdState } from 'store/slices/dashboardsSlice'
import { currentUserStateEmail } from 'store/slices/usersSlice'
import { setDashboards } from 'store/slices/dashboardsSlice'
import { setUsers } from 'store/slices/usersSlice'
import { generalBoardCollection } from 'firebase-client'


const GetState = ({ children }) => {
  const dispatch = useDispatch()
  const dashboardId = useSelector(currentDashboardIdState)
  const userEmail = useSelector(currentUserStateEmail)


  const cardsCollection = collection(generalBoardCollection, `${dashboardId}`, "cards")

  useEffect(() => {
    onSnapshot(usersCollection, (snapshot) => {
      const usersSnap = snapshot.docs.map((doc) => {
        return { ...doc.data(), id: doc.id }
      })
      dispatch(setUsers(usersSnap))
    })
  }, [])

  // useEffect(() => {
  //   onSnapshot(usersCollection, (snapshot) => {
  //     const dashboardSnap = snapshot.docs.map((doc) => {
  //       return { ...doc.data(), id: doc.id }
  //     })
  //     dispatch(setDashboards(dashboardSnap))
  //   })
  // }, [userEmail])
  
  useEffect(() => {
    onSnapshot(generalBoardCollection, (snapshot) => {
      const dashboardSnap = snapshot.docs.map((doc) => {
        return { ...doc.data(), id: doc.id }
      })
      dispatch(setDashboards(dashboardSnap))
    })
  }, [userEmail])
 
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
