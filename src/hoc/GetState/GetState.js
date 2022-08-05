import { dashboardsCollection } from 'firebase-client'
import { collection, onSnapshot } from 'firebase/firestore'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setBoardCards } from 'store/slices/boardCardsSlice'
import { currentDashboardIdState } from 'store/slices/currentDashboardSlice'
import { setDashboards } from 'store/slices/dashboardsSlice'

const GetState = ({ children }) => {
  const dispatch = useDispatch()
  const dashboardIf = useSelector(currentDashboardIdState)
  const cardsCollection = collection(dashboardsCollection, `${dashboardIf}`, "cards")
  console.log(dashboardIf)
  useEffect(() => {
    onSnapshot(dashboardsCollection, (snapshot) => {
      const dashboardSnap = snapshot.docs.map((doc) => {
        return { ...doc.data(), id: doc.id }
      })
      dispatch(setDashboards(dashboardSnap))
    })
  }, [])

  useEffect(() => {
    onSnapshot(cardsCollection, (snapshot) => {
      const cardSnap = snapshot.docs.map((doc) => {
        return { ...doc.data(), id: doc.id }
      })
      dispatch(setBoardCards(cardSnap))
    })
  }, [dashboardIf])

  return children
}

export default GetState
