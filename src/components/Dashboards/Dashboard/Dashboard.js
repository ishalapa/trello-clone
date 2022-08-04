import React from 'react'

import {Button} from "@mui/material"

const Dashboard = ({board}) => {
  return (
    <Button sx={{width:"200px", height:"200px"}} variant='outlined' size='large'>
        {board.title}
    </Button>
  )
}

export default Dashboard