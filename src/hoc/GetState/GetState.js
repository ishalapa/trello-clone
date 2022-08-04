import { dashboardsCollection } from 'firebase-client'
import { onSnapshot } from 'firebase/firestore'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setDashboards } from 'store/slices/dashboardsSlice'

const GetState = ({ children }) => {
  const dispatch = useDispatch()
  
  useEffect(() => {
    onSnapshot(dashboardsCollection, (snapshot) => {
      const dashboardSnap = snapshot.docs.map((doc) => {
        return { ...doc.data(), id: doc.id }
      })
      dispatch(setDashboards(dashboardSnap))
    })
  }, [])

  return children
}

export default GetState
