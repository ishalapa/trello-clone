import React from 'react'

import {Button} from "@mui/material"
import { Link, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { currentDashboardState, setCurrentDashboard } from 'store/slices/currentDashboardSlice'
import { doc, getDoc } from 'firebase/firestore'
import { dashboardsCollection } from 'firebase-client'
import { async } from '@firebase/util'

const Dashboard = ({board}) => {
    const {path} = useParams()

    const dispatch = useDispatch()
    const currentDashboard = useSelector(currentDashboardState)
    const handleClick = async (id) => {
        const docRef = doc(dashboardsCollection, id);
        const docSnap = await getDoc(docRef);
        dispatch(setCurrentDashboard(docSnap.data()))
    }
  return (
    <Button onClick={()=> {handleClick(board.id)}} sx={{width:"200px", height:"200px"}} variant='outlined' size='large'>
        {board.title}
        <Link to={path}>to PPATH</Link>
    </Button>
  )
}

export default Dashboard