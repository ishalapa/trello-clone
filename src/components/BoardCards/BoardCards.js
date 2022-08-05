import React from 'react'
import { useSelector } from 'react-redux'
import { boardCardsState } from 'store/slices/boardCardsSlice'
import BoardCard from './BoardCard/BoardCard'

import { Stack } from '@mui/material'
import AddNewListBtn from 'components/AddNewListBtn'

const BoardCards = () => {
  const cards = useSelector(boardCardsState)
  
  return (
    <Stack spacing={2} direction="row">
      {cards && cards.map((card) => <BoardCard key={card.id} card={card} />)}
        <AddNewListBtn />
    </Stack>
  )
}

export default BoardCards
