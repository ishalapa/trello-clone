import React, {useEffect} from 'react'
import { useDispatch } from 'react-redux'
import { setDescriptionExist, setDescriptionId, setDescriptionTitle } from 'store/slices/descriptionSlice'

import {Typography} from "@mui/material"

const Description = ({desc}) => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(setDescriptionExist(true))
        dispatch(setDescriptionId(desc.id))
        dispatch(setDescriptionTitle(desc.title))
    }, [desc]);

  return (
    <Typography variant="body2" sx={{ mt: 1 }}>{desc.title}</Typography>
  )
}

export default Description