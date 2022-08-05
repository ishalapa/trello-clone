import {createSlice} from "@reduxjs/toolkit"


const initialState = {
    boardCards: null
}
const boardCardsSlice = createSlice({
    name: "boardCards",
    initialState,
    reducers: {
        setBoardCards: (state, action) => {
            state.boardCards = action.payload
        }
    }
})

export const { setBoardCards } = boardCardsSlice.actions

export const boardCardsState = state => state.boardCards.boardCards

export default boardCardsSlice.reducer