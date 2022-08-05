import React, {useState} from 'react'

import { Button, Box, Stack, IconButton, TextField } from '@mui/material'
import {AiOutlinePlus, AiOutlineClose} from "react-icons/ai"

const AddNewListBtn = () => {
    const [isBtnClicked, setIsBtnClicked] = useState(false)
  return (
    <div>
        {!isBtnClicked ? (<Button
        size='medium'
        startIcon={<AiOutlinePlus />}
        onClick={() => setIsBtnClicked(true)}
        variant="outlined"
        sx={{ justifyContent: 'flex-start', width: '290px', height:"40px", '&:hover': { backgroundColor: '#e6e6e6' } }}
      >
        Add another list
      </Button>) : (
          <Box pt={1} width="290px">
            <TextField
              sx={{backgroundColor:"white"}}
              size="small"
              variant="outlined"
              multiline
              minRows={1}
              maxRows={5}
              placeholder="Enter a title for this card"
              fullWidth
            />
            <Stack pt={1} spacing={1} direction="row" alignItems="center">
              <Button variant="contained">Add card</Button>
              <IconButton onClick={() => setIsBtnClicked(false)} size="small">
                <AiOutlineClose />
              </IconButton>
            </Stack>
          </Box>
        )}
    </div>
  )
}

export default AddNewListBtn