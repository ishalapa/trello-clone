import React, { useState } from 'react'

import { CardContent, Typography, Button, Card, TextField, Box, Stack, IconButton } from '@mui/material'
import { AiOutlinePlus, AiOutlineClose } from 'react-icons/ai'
import { cardsCollection } from 'firebase-client'
const BoardCard = () => {
  const [isBtnClicked, setIsBtnClicked] = useState(false)
  return (
    <Card sx={{ width: '250px', backgroundColor:"#f2f2f2" }}>
      <CardContent>
        <Typography variant="h6" color="#000066">
          TODO
        </Typography>
        {!isBtnClicked ? (
          <Button
            onClick={() => setIsBtnClicked(true)}
            startIcon={<AiOutlinePlus />}
            fullWidth
            variant="text"
            sx={{ justifyContent: 'flex-start', marginTop: '5px', '&:hover': { backgroundColor: '#e6e6e6' } }}
          >
            Add card
          </Button>
        ) : (
          <Box pt={1}>
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
              <Button onClick={()=> console.log(cardsCollection.data())} variant="contained">Add card</Button>
              <IconButton onClick={() => setIsBtnClicked(false)} size="small">
                <AiOutlineClose />
              </IconButton>
            </Stack>
          </Box>
        )}
      </CardContent>
    </Card>
  )
}

export default BoardCard
