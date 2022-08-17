import {createSlice} from "@reduxjs/toolkit"


const initialState = {
    comment: {
        id: null,
        title: ""
    }
}
const commentSlice = createSlice({
    name: "comment",
    initialState,
    reducers: {
        setCommentId: (state, action) => {
            state.comment.id = action.payload
        },
        setCommentTitle: (state, action) => {
            state.comment.title = action.payload
        }
    }
})

export const { setCommentId, setCommentTitle } = commentSlice.actions

export const commentState = state => state.comment.comment

export default commentSlice.reducer