import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    comments: null,
}
const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    setComments: (state, action) => {
      state.comments = action.payload
    }
  },
})

export const { setComments } = commentsSlice.actions

export const commentsState = (state) => state.comments.comments

export default commentsSlice.reducer
